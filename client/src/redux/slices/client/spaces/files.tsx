import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import client from "@/graphql/apollo-client";
import { DELETE_FILE } from "@/graphql/mutations";
import { serverUrl } from "@/data/config";
import { toast } from "sonner";
import { toastWarning, toastSuccess } from "@/utils/toastStyles";
import { RootState } from "@/redux/store/store";
import { FilesProps } from "@/utils/types/client";
import axios from "axios";

const initialState = {
  currentSpaceFiles: [] as FilesProps[],
  currentFile: {} as FilesProps,
  fileLoading: false,
};

export const createFile = createAsyncThunk(
  "files/createFile",
  async (input: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      input.userId = state.authSession.session.current.id;
      input.filename = input.coverImage ? input.coverImage.name : "";
      input.spaceId = state.client.spaces.spaces.currentSpace.id;
      const res = await axios.post(`${serverUrl}rest/files/upload`, input, {
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

export const deleteFile = createAsyncThunk(
  "files/deleteFile",
  async (input: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;

      //graphql
      const res = await client.mutate({
        mutation: DELETE_FILE,
        variables: {
          fileId: input.fileId,
          spaceId: state.client.spaces.spaces.currentSpace.id,
        },
      });

      return res.data.deleteFile;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const editFile = createAsyncThunk(
  "files/editFile",
  async (input: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      input.filename = input.coverImage ? input.coverImage.name : "";
      input.fileId = state.client.spaces.files.currentFile.id;
      const res = await axios.put(`${serverUrl}rest/files/edit`, input, {
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

const postsSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setCurrentSpaceFiles: (state, action: PayloadAction<FilesProps[]>) => {
      state.currentSpaceFiles = action.payload as FilesProps[];
    },
    setCurrentFile: (state, action: PayloadAction<FilesProps>) => {
      state.currentFile = action.payload as FilesProps;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createFile.pending, (state, action) => {
      state.fileLoading = true;
    });
    builder.addCase(createFile.fulfilled, (state, action) => {
      state.fileLoading = false;
      state.currentSpaceFiles = [...state.currentSpaceFiles, action.payload];
    });
    builder.addCase(createFile.rejected, (state, action) => {
      state.fileLoading = false;
    });
    builder.addCase(deleteFile.pending, (state, action) => {
      state.fileLoading = true;
      toast("Eliminando archivo...", toastWarning);
    });
    builder.addCase(deleteFile.fulfilled, (state, action) => {
      state.fileLoading = false;
      state.currentSpaceFiles = state.currentSpaceFiles.filter(
        (file) => file.id !== action.payload.id
      );

      toast.success("Archivo eliminado", toastSuccess);
    });
    builder.addCase(deleteFile.rejected, (state, action) => {
      state.fileLoading = false;
    });
    builder.addCase(editFile.pending, (state, action) => {
      state.fileLoading = true;
    });
    builder.addCase(editFile.fulfilled, (state, action) => {
      state.fileLoading = false;
      state.currentSpaceFiles = state.currentSpaceFiles.map((file) =>
        file.id === action.payload.id ? action.payload : file
      );
    });
    builder.addCase(editFile.rejected, (state, action) => {
      state.fileLoading = false;
    });
  },
});

export const { setCurrentSpaceFiles, setCurrentFile } = postsSlice.actions;

export default postsSlice.reducer;
