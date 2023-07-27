import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import client from "@/graphql/apollo-client";
import { GET_USER_BY_ID } from "@/graphql/queries";
import { AuthClass } from "@/utils/types/client";
import { UserProps } from "@/utils/types/client";
import { setSpaces } from "@/redux/slices/client/spaces/spaces";
import { LOG_IN, CREATE_USER, CHANGE_PASSWORD } from "@/graphql/mutations";
import Router from "next/router";
import { toast } from "sonner";
import { toastSuccess, toastError, toastWarning } from "@/utils/toastStyles";
import { RootState } from "../store/store";
import axios from "axios";
import { serverUrl } from "@/data/config";

const initialState = {
  auth: {} as AuthClass,
  session: {
    current: {} as UserProps,
    loading: false,
  },
};

export const setSession = createAsyncThunk(
  "auth/setSession",
  async (userId: string, { dispatch, getState }) => {
    try {
      const { data } = await client.query({
        query: GET_USER_BY_ID,
        variables: { id: userId },
        fetchPolicy: "network-only",
      });

      dispatch(setSpaces(data.findUserById.spaces));
      return data.findUserById;
    } catch (err: any) {
      throw new Error("Error al loguear el usuario", err);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: any, { dispatch, getState }) => {
    try {
      const { data } = await client.mutate({
        mutation: LOG_IN,
        variables: { email: credentials.email, password: credentials.password },
        fetchPolicy: "network-only",
      });

      return data.createSession;
    } catch (err: any) {
      throw new Error("Error al loguear el usuario", err);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData: any, { dispatch, getState }) => {
    try {
      const { data, errors } = await client.mutate({
        mutation: CREATE_USER,
        variables: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
          username: userData.username,
        },
        fetchPolicy: "network-only",
      });
      if (errors) console.error("Error al crear el usuario", errors);

      return data.createUser;
    } catch (err: any) {
      console.error("Error al crear el usuario", err);
      throw new Error("Error al crear el usuario", err);
    }
  }
);

export const editUser = createAsyncThunk(
  "auth/editUser",
  async (userData: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      userData.userId = state.authSession.session.current.id;
      userData.filenamePi = userData.profileImage
        ? userData.profileImage.name
        : "";
      userData.filenameCi = userData.coverImage ? userData.coverImage.name : "";
      const res = await axios.put(`${serverUrl}rest/users/edit`, userData, {
        headers: {
          //multipart/form-data
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (err: any) {
      console.error("Error al crear el usuario", err);
      throw new Error("Error al crear el usuario", err);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (userData: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      userData.userId = state.authSession.session.current.id;

      //USAMOS GRAPHQL
      const { data, errors } = await client.mutate({
        mutation: CHANGE_PASSWORD,
        variables: {
          userId: userData.userId,
          oldPassword: userData.oldPassword,
          newPassword: userData.newPassword,
        },
        fetchPolicy: "network-only",
      });

      return data;
    } catch (err: any) {
      console.error("Error al cambiar contraseña", err);
      throw new Error("Error al cambiar contraseña", err);
    }
  }
);
//Reducers
const postsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthClass>) => {
      state.auth = action.payload;
    },
    resetReducer: (state) => {
      state.auth = initialState.auth;
      state.session = initialState.session;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setSession.pending, (state, action) => {
        if (action.meta.arg === state.session.current.id) {
          state.session.loading = false;
        } else {
          state.session.loading = true;
        }
      })
      .addCase(setSession.fulfilled, (state, action) => {
        state.session.current = new UserProps(
          action.payload.id,
          action.payload.firstName,
          action.payload.lastName,
          action.payload.username,
          action.payload.profileImage,
          action.payload.email,
          action.payload.isSuperAdmin,
          action.payload.softDelete,
          action.payload.coverImage,
          action.payload.spaces
        );

        state.session.loading = false;
      })
      .addCase(setSession.rejected, (state, action) => {
        console.error("Rejected setSession", action.payload);
      })
      .addCase(login.pending, (state, action) => {})
      .addCase(login.fulfilled, (state, action) => {
        if (Router?.query?.next) {
          Router.push(
            `${Router.query.next}&accessCode=${Router.query.accessCode}&spaceId=${Router.query.spaceId}&id=${action.payload.userId}&status=ok&session=${action.payload.id}&loginMethod=local`
          );
        } else {
          Router.push(
            `/client?id=${action.payload.userId}&status=ok&session=${action.payload.id}&loginMethod=local`
          );
        }

        toast("Bienvenido a Spaces");
      })
      .addCase(login.rejected, (state, action) => {
        console.error("Rejected login", action.payload);
        toast.error("Verifica las credenciales", toastError);
      })
      .addCase(register.pending, (state, action) => {})
      .addCase(register.fulfilled, (state, action) => {
        const query: string = Router.asPath.split("register")[1] || "";
        toast.success("Registro exitoso", toastSuccess);
        Router.push(`/auth/${query}`);
      })
      .addCase(register.rejected, (state, action) => {
        console.error("Rejected register", action);
        toast.error("Verifica los datos", toastError);
      })
      .addCase(editUser.pending, (state, action) => {
        toast("Editando usuario");
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.session.current = new UserProps(
          action.payload.id,
          action.payload.firstName,
          action.payload.lastName,
          action.payload.username,
          action.payload.profileImage,
          action.payload.email,
          action.payload.isSuperAdmin,
          action.payload.softDelete,
          action.payload.coverImage,
          state.session.current.spaces
        );

        toast.success("Edición exitosa", toastSuccess);
      })
      .addCase(editUser.rejected, (state, action) => {
        console.error("Rejected editUser", action);
        toast.error("Verifica los datos", toastError);
      })
      .addCase(changePassword.pending, (state, action) => {
        toast("Editando contraseña");
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        toast.success("Edición exitosa", toastSuccess);
      })
      .addCase(changePassword.rejected, (state, action) => {
        console.error("Rejected changePassword", action);
        toast.error("Verifica los datos", toastError);
      });
  },
});

export const { setAuth, resetReducer } = postsSlice.actions;

export default postsSlice.reducer;
