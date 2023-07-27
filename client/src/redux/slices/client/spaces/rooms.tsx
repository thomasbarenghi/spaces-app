import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "@/graphql/apollo-client";
import { GET_SPACE_BY_ID, GET_ROOM_BY_ID } from "@/graphql/queries";
import { DELETE_ROOM } from "@/graphql/mutations";
import { toast } from "sonner";
import { toastError, toastSuccess } from "@/utils/toastStyles";
import { RootState } from "@/redux/store/store";
import Router from "next/router";
import { RoomsProps } from "@/utils/types/client";
import axios from "axios";
import { serverUrl } from "@/data/config";
import { setCurrentRoomTasks } from "./tasks";

const initialState = {
  rooms: [] as RoomsProps[],
  currentRoom: {} as RoomsProps,
  roomLoading: false,
};

export const getRooms = createAsyncThunk(
  "rooms/getRooms",
  async (spaceId: string, { dispatch, getState }) => {
    try {
      const { data } = await client.query({
        query: GET_SPACE_BY_ID,
        variables: { id: spaceId },
        fetchPolicy: "network-only",
      });
      return data.findSpaceById;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const getCurrentRoom = createAsyncThunk(
  "rooms/getCurrentRoom",
  async (roomId: string, { dispatch, getState }) => {
    try {
      const { data } = await client.query({
        query: GET_ROOM_BY_ID,
        variables: { id: roomId },
        fetchPolicy: "network-only",
      });

      dispatch(setCurrentRoomTasks(data.findRoomById.tasks));
      return data.findRoomById;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const createRoom = createAsyncThunk(
  "rooms/createRoom",
  async (input: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      input.spaceOwnerId = state.client.spaces.spaces.currentSpace.id;
      input.filename = input.coverImage ? input.coverImage.name : "";
      // const { data } = await client.mutate({
      //   mutation: CREATE_ROOM,
      //   variables: {
      //     spaceOwnerId: state.client.spaces.spaces.currentSpace.id,
      //     name: input.name,
      //     description: input.description,
      //     coverImage: input.coverImage,
      //   },
      //   fetchPolicy: "network-only",
      // });

      const res = await axios.post(`${serverUrl}rest/rooms/create`, input, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return { data: res.data, state: state.client.spaces };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const editRoom = createAsyncThunk(
  "rooms/editRoom",
  async (input: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      //Agregamos el id del espacio a editar
      input.roomId = state.client.spaces.rooms.currentRoom.id;
      input.filename = input.coverImage ? input.coverImage.name : "";
      const { data } = await axios.put(`${serverUrl}rest/rooms/edit`, input, {
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

export const deleteRoom = createAsyncThunk(
  "rooms/deleteRoom",
  async (info, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const { data } = await client.mutate({
        mutation: DELETE_ROOM,
        variables: {
          id: state.client.spaces.rooms.currentRoom.id,
        },
        fetchPolicy: "network-only",
      });

      return { data: data.deleteRoom, state: state.client.spaces };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

//Reducers
const postsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    resetReducer: (state) => {
      state.rooms = initialState.rooms;
      state.currentRoom = initialState.currentRoom;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRooms.pending, (state, action) => {})
      .addCase(getRooms.fulfilled, (state, action) => {
        state.rooms = action?.payload?.rooms as RoomsProps[] | [];
      })
      .addCase(getRooms.rejected, (state) => {
        console.error("Error al obtener las salas");
        toast.error("Error al obtener las salas", toastError);
      })
      .addCase(getCurrentRoom.pending, (state, action) => {
        if (action.meta.arg === state.currentRoom.id) {
          state.roomLoading = false;
        } else {
          state.roomLoading = true;
        }
      })
      .addCase(getCurrentRoom.fulfilled, (state, action) => {
        state.currentRoom = action.payload as RoomsProps;
        state.roomLoading = false;
      })
      .addCase(getCurrentRoom.rejected, (state) => {
        console.error("Error al obtener la sala actual");
        toast.error("Error al obtener la sala actual", toastError);
      })
      .addCase(createRoom.pending, (state) => {})
      .addCase(createRoom.fulfilled, (state, action) => {
        Router.push(
          `/client/${action?.payload?.state?.spaces?.currentSpace?.id}/${action?.payload?.data}`
        );
        toast.success("Sala creada correctamente", toastSuccess);
      })
      .addCase(createRoom.rejected, (state) => {
        console.error("Error al crear la sala");
        toast.error("Error al crear la sala", toastError);
      })
      .addCase(editRoom.pending, (state) => {})
      .addCase(editRoom.fulfilled, (state, action) => {
        //Actualizamos el espacio actual
        state.currentRoom = {
          ...state.currentRoom,
          name: action.payload.name,
          description: action.payload.description,
          coverImage: action.payload.coverImage,
        };
        toast.success("Sala editada correctamente", toastSuccess);
      })
      .addCase(editRoom.rejected, (state) => {
        console.error("Error al editar la sala");
        toast.error("Error al editar la sala", toastError);
      })
      .addCase(deleteRoom.pending, (state) => {})
      .addCase(deleteRoom.fulfilled, (state, action) => {
        toast.success("Sala borrada correctamente", toastSuccess);
        Router.push(`/client/${action?.payload?.state.spaces.currentSpace.id}`);
      })
      .addCase(deleteRoom.rejected, (state) => {
        console.error("Error al borrar la sala");
        toast.error("Error al borrar la sala", toastError);
      });
  },
});

export const { resetReducer } = postsSlice.actions;

export default postsSlice.reducer;
