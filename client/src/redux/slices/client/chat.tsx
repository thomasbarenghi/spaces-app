import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [] as any,
  currentChat: {
    messages: [] as any,
    id: "" as string | null,
    otherUser: {} as any,
    chatUserStatus: false as any,
  },
};

//Reducers
const postsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export const {} = postsSlice.actions;

export default postsSlice.reducer;
