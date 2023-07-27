import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import client from "@/graphql/apollo-client";
import {
  CREATE_TASK,
  EDIT_TASK,
  DELETE_TASK,
  CREATE_COMMENT,
} from "@/graphql/mutations";
import { toast } from "sonner";
import { toastError, toastSuccess } from "@/utils/toastStyles";
import { RootState } from "@/redux/store/store";
import { TasksProps } from "@/utils/types/client";
import { CommentProps } from "@/utils/types/client";
const initialState = {
  currentRoomTasks: [] as TasksProps[],
  currentTask: new TasksProps("", "", "", "", 1, [], [], ""),
  currentTaskComments: [] as CommentProps[],
};

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (input: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const { data } = await client.mutate({
        mutation: CREATE_TASK,
        variables: {
          roomOwnerId: state.client.spaces.rooms.currentRoom.id,
          title: input.title,
          description: input.description,
          assignedToIds: input.assignedToIds,
          status: 1,
          longDescription: input.longDescription,
        },
        fetchPolicy: "network-only",
      });

      return data.createTask;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (info, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const { data } = await client.mutate({
        mutation: DELETE_TASK,
        variables: {
          taskId: state.client.spaces.tasks.currentTask.id,
          roomId: state.client.spaces.rooms.currentRoom.id,
        },
        fetchPolicy: "network-only",
      });

      return data.deleteTask;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async (input: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      //Agregamos el id del espacio a editar
      input.taskId = state.client.spaces.tasks.currentTask.id;
      input.roomId = state.client.spaces.rooms.currentRoom.id;
      const { data } = await client.mutate({
        mutation: EDIT_TASK,
        variables: input,
        fetchPolicy: "network-only",
      });
      return data.editTask;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const createComment = createAsyncThunk(
  "tasks/createComment",
  async (input: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const { data } = await client.mutate({
        mutation: CREATE_COMMENT,
        variables: {
          taskId: state.client.spaces.tasks.currentTask.id,
          content: input.content,
          userId: state.authSession.session.current.id,
          roomId: state.client.spaces.rooms.currentRoom.id,
        },
        fetchPolicy: "network-only",
      });

      return data.createComment;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

//Reducers
const postsSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setCurrentTask: (state, action: PayloadAction<TasksProps>) => {
      //recibimos la tarea

      if (action.payload instanceof TasksProps) {
        state.currentTask = action.payload;
        state.currentTaskComments = action.payload.comments as CommentProps[];
      }
    },
    setCurrentRoomTasks: (state, action: PayloadAction<TasksProps[]>) => {
      //recibimos la tarea

      state.currentRoomTasks = action.payload as TasksProps[];
    },
    addTaskSubs: (state, action: PayloadAction<TasksProps>) => {
      state.currentRoomTasks.push(action.payload);
    },
    deleteTaskSubs: (state, action: PayloadAction<TasksProps>) => {
      state.currentRoomTasks = state.currentRoomTasks.filter(
        (task) => task.id !== action.payload.id
      );
    },
    setCurrentTaskComments: (state, action: PayloadAction<CommentProps[]>) => {
      //recibimos la tarea

      state.currentTaskComments = action.payload as CommentProps[];
    },
    editTaskSubs: (state, action: PayloadAction<TasksProps>) => {
      state.currentRoomTasks = state.currentRoomTasks.map((task) => {
        if (task.id === action.payload.id) {
          const newTask = new TasksProps(
            action.payload.id,
            action.payload.title,
            action.payload.description,
            action.payload.deadline,
            action.payload.status,
            action.payload.assignedTo,
            action.payload.comments,
            action.payload.longDescription
          );

          return newTask;
        } else {
          return task;
        }
      });

      if (state.currentTask.id === action.payload.id) {
        state.currentTaskComments = action.payload.comments as CommentProps[];
      }
    },
    resetReducer: (state) => {
      state.currentRoomTasks = [];
      state.currentTask = {} as TasksProps;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(createTask.pending, (state) => {})
      .addCase(createTask.fulfilled, (state, action) => {
        toast.success("Tarea creada correctamente", toastSuccess);
      })
      .addCase(createTask.rejected, (state) => {
        toast.error("Error al crear tarea", toastError);
      })
      .addCase(editTask.pending, (state) => {})
      .addCase(editTask.fulfilled, (state, action) => {
        toast.success("Tarea editada correctamente", toastSuccess);
      })
      .addCase(editTask.rejected, (state) => {
        toast.error("Error al editar tarea", toastError);
      })
      .addCase(deleteTask.pending, (state) => {})
      .addCase(deleteTask.fulfilled, (state, action) => {
        toast.success("Tarea borrada correctamente", toastSuccess);
      })
      .addCase(deleteTask.rejected, (state) => {
        toast.error("Error al borrar tarea", toastError);
      })
      .addCase(createComment.pending, (state) => {})
      .addCase(createComment.fulfilled, (state, action) => {
        toast.success("Comentario creado correctamente", toastSuccess);
      })
      .addCase(createComment.rejected, (state) => {
        toast.error("Error al crear comentario", toastError);
      });
  },
});

export const {
  resetReducer,
  setCurrentTask,
  setCurrentRoomTasks,
  addTaskSubs,
  editTaskSubs,
  deleteTaskSubs,
  setCurrentTaskComments,
} = postsSlice.actions;

export default postsSlice.reducer;
