import { configureStore } from "@reduxjs/toolkit";
import CommentSlice from "./comment-slice";

const store = configureStore({
  reducer: { comments: CommentSlice.reducer },
});

export const commentActions = CommentSlice.actions;

export default store;
