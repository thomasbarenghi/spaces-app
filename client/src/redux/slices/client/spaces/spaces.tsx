import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import client from "@/graphql/apollo-client";
import { GET_SPACE_BY_ID } from "@/graphql/queries";
import {
  DELETE_SPACE,
  JOIN_SPACE,
  LEAVE_SPACE,
  SEND_MESSAGE,
  CHANGE_USER_ROLE,
} from "@/graphql/mutations";
import { serverUrl } from "@/data/config";
import { toast } from "sonner";
import { toastError, toastSuccess } from "@/utils/toastStyles";
import { RootState } from "@/redux/store/store";
import Router from "next/router";
import {
  SpaceProps,
  ChatProps,
  RoomsProps,
  MembersProps,
} from "@/utils/types/client";
import axios from "axios";
import { setCurrentSpaceFiles } from "@/redux/slices/client/spaces/files";

const initialState = {
  spaces: [] as SpaceProps[],
  currentSpace: {} as SpaceProps,
  currentSpaceMembers: [] as MembersProps[],
  currentMember: {} as MembersProps,
  currentSpaceChat: {} as ChatProps,
  spaceLoading: false,
};

export const getCurrentSpace = createAsyncThunk(
  "spaces/getCurrentSpace",
  async (spaceId: string, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const { data } = await client.query({
        query: GET_SPACE_BY_ID,
        variables: { id: spaceId },
        fetchPolicy: "network-only",
      });

      dispatch(setCurrentSpaceFiles(data.findSpaceById.files));

      return {
        data: data.findSpaceById,
        state: state,
        userId: state.authSession.session.current.id,
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const createSpace = createAsyncThunk(
  "spaces/createSpace",
  async (input: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      input.userOwner = state.authSession.session.current.id;
      input.filename = input.coverImage ? input.coverImage.name : "";
      const res = await axios.post(`${serverUrl}rest/spaces/create`, input, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const deleteSpace = createAsyncThunk(
  "spaces/deleteSpace",
  async (info, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const { data } = await client.mutate({
        mutation: DELETE_SPACE,
        variables: {
          id: state.client.spaces.spaces.currentSpace.id,
        },
        fetchPolicy: "network-only",
      });

      return data.deleteSpace;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const editSpace = createAsyncThunk(
  "spaces/editSpace",
  async (input: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      input.spaceId = state.client.spaces.spaces.currentSpace.id;
      input.filename = input.coverImage ? input.coverImage.name : "";

      const { data } = await axios.put(`${serverUrl}rest/spaces/edit`, input, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

//-----------------------Chat-----------------------//
export const sendMessage = createAsyncThunk(
  "spaces/sendMessage",
  async (input: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const { data } = await client.mutate({
        mutation: SEND_MESSAGE,
        variables: {
          userId: state.authSession.session.current.id,
          chatId: state.client.spaces.spaces.currentSpaceChat.id,
          content: input.message,
        },
        fetchPolicy: "network-only",
      });

      return data.sendMessage;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

//-----------------------Otros-----------------------//
export const joinSpace = createAsyncThunk(
  "spaces/joinSpace",
  async (input: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const { data } = await client.mutate({
        mutation: JOIN_SPACE,
        variables: {
          accessCode: input.accessCode,
          userId: state.authSession.session.current.id,
          spaceId: input.spaceId,
        },
        fetchPolicy: "network-only",
      });

      return data.joinSpace;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const leaveSpace = createAsyncThunk(
  "spaces/leaveSpace",
  async (data, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;

      const { data } = await client.mutate({
        mutation: LEAVE_SPACE,
        variables: {
          userId: state.authSession.session.current.id,
          spaceId: state.client.spaces.spaces.currentSpace.id,
        },
        fetchPolicy: "network-only",
      });

      return data.leaveSpace;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

//usamos leave
export const expulseMember = createAsyncThunk(
  "spaces/expulseMember",
  async (input: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const { data } = await client.mutate({
        mutation: LEAVE_SPACE,
        variables: {
          userId: input.userId,
          spaceId: state.client.spaces.spaces.currentSpace.id,
        },
        fetchPolicy: "network-only",
      });

      return data.leaveSpace;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const changeUserRole = createAsyncThunk(
  "spaces/changeUserRole",
  async (input: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const { data } = await client.mutate({
        mutation: CHANGE_USER_ROLE,
        variables: {
          userId: input.userId,
          spaceId: state.client.spaces.spaces.currentSpace.id,
          role: input.role,
        },
        fetchPolicy: "network-only",
      });

      return data.changeUserRole;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

//Reducers
const postsSlice = createSlice({
  name: "spaces",
  initialState,
  reducers: {
    setSpaces: (state, action: PayloadAction<SpaceProps[]>) => {
      state.spaces = action.payload.map(
        (spaceData: SpaceProps) =>
          new SpaceProps(
            spaceData.id,
            spaceData.name,
            spaceData.accessCode,
            spaceData.description,
            spaceData.coverImage,
            spaceData.rooms as RoomsProps[],
            spaceData.members as MembersProps[]
          )
      );
    },
    setIsAdminOfCurrentSpace: (state, action: PayloadAction<boolean>) => {
      // state.userIsAdminOfCurrentSpace = action.payload;
    },
    setIsOwnerOfCurrentSpace: (state, action: PayloadAction<boolean>) => {
      //  state.userIsOwner = action.payload;
    },
    addMessage: (state, action: PayloadAction<any>) => {
      state.currentSpaceChat.messages.push(action.payload);
    },
    resetReducer: (state) => {
      state.spaces = initialState.spaces;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentSpace.pending, (state, action) => {
        if (action.meta.arg === state.currentSpace.id) {
          state.spaceLoading = false;
        } else {
          state.spaceLoading = true;
        }
      })
      .addCase(getCurrentSpace.fulfilled, (state, action) => {
        state.currentSpace = new SpaceProps(
          action?.payload?.data?.id,
          action?.payload?.data?.name,
          action?.payload?.data?.accessCode,
          action?.payload?.data?.description,
          action?.payload?.data?.coverImage,
          [] as RoomsProps[],
          action?.payload?.data?.members as MembersProps[]
        );

        state.currentSpaceChat = action?.payload?.data?.chat as ChatProps;
        state.currentSpaceMembers = action?.payload?.data?.members?.map(
          (memberData: any) =>
            new MembersProps(memberData.user, memberData.role)
        );

        const currentMember = state.currentSpaceMembers.find(
          (member: MembersProps) => member.getId() === action?.payload?.userId
        ) as MembersProps;

        state.currentMember = currentMember as MembersProps;
        state.spaceLoading = false;
      })
      .addCase(getCurrentSpace.rejected, (state) => {
        toast.error("Error al obtener espacio", toastError);
      })
      .addCase(createSpace.pending, (state) => {})
      .addCase(createSpace.fulfilled, (state, action) => {
        state.currentSpace = action?.payload as SpaceProps;
        Router.push(`/client/${action.payload}`);
        toast.success("Espacio creado correctamente", toastSuccess);
      })
      .addCase(createSpace.rejected, (state) => {
        toast.error("Error al crear espacio", toastError);
      })
      .addCase(deleteSpace.pending, (state) => {})
      .addCase(deleteSpace.fulfilled, (state, action) => {
        toast.success("Espacio borrado correctamente", toastSuccess);
        Router.push(`/client`);
      })
      .addCase(deleteSpace.rejected, (state) => {
        toast.error("Error al borrar espacio", toastError);
      })
      .addCase(editSpace.pending, (state) => {})
      .addCase(editSpace.fulfilled, (state, action) => {
        //Actualizamos el espacio actual
        state.currentSpace = {
          ...state.currentSpace,
          name: action.payload.name,
          description: action.payload.description,
          accessCode: action.payload.accessCode,
          coverImage: action.payload.coverImage,
        };
        toast.success("Espacio editado correctamente", toastSuccess);
      })
      .addCase(editSpace.rejected, (state) => {
        toast.error("Error al editar espacio", toastError);
      })

      .addCase(joinSpace.pending, (state) => {})
      .addCase(joinSpace.fulfilled, (state, action) => {
        Router.push(`/client/${action?.payload?.id}`);
        toast.success("Espacio unido correctamente", toastSuccess);
      })
      .addCase(joinSpace.rejected, (state) => {
        toast.error("Error al unirse al espacio", toastError);
      })
      .addCase(leaveSpace.pending, (state) => {})
      .addCase(leaveSpace.fulfilled, (state, action) => {
        Router.push(`/client`);
        toast.success("Espacio abandonado correctamente", toastSuccess);
      })
      .addCase(leaveSpace.rejected, (state) => {
        toast.error("Error al abandonar espacio", toastError);
      })
      .addCase(expulseMember.pending, (state) => {})
      .addCase(expulseMember.fulfilled, (state, action) => {
        toast.success("Miembro expulsado correctamente", toastSuccess);
      })
      .addCase(expulseMember.rejected, (state) => {
        toast.error("Error al expulsar miembro", toastError);
      })
      .addCase(sendMessage.pending, (state) => {})
      .addCase(sendMessage.fulfilled, (state, action) => {})
      .addCase(sendMessage.rejected, (state) => {
        toast.error("Error al enviar mensaje", toastError);
      })
      .addCase(changeUserRole.pending, (state) => {})
      .addCase(changeUserRole.fulfilled, (state, action) => {
        state.currentSpaceMembers = action.payload.members;
        toast.success("Rol cambiado correctamente", toastSuccess);
      })
      .addCase(changeUserRole.rejected, (state) => {
        toast.error("Error al cambiar rol", toastError);
      });
  },
});

export const {
  resetReducer,
  setSpaces,
  addMessage,
  setIsAdminOfCurrentSpace,
  setIsOwnerOfCurrentSpace,
} = postsSlice.actions;

export default postsSlice.reducer;
