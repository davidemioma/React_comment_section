import { createSlice } from "@reduxjs/toolkit";
import { comments } from "../data.json";
import { currentUser } from "../data.json";

const CommentSlice = createSlice({
  name: "comments",
  initialState: {
    currentUser: currentUser,
    comments: comments,
    activeComment: null,
  },
  reducers: {
    setCommentToActive(state, action) {
      state.activeComment = action.payload;
    },

    addComment(state, action) {
      const newComment = action.payload;

      const existingComment = state.comments.find(
        (comment) => comment.id === newComment.id
      );

      if (!existingComment) {
        state.comments.unshift(newComment);
      }
    },

    deleteComment(state, action) {
      const id = action.payload;

      const existingComment = state.comments.find(
        (comment) => comment.id === id
      );

      if (existingComment) {
        state.comments = state.comments.filter((comment) => comment.id !== id);
      }
    },

    editComment(state, action) {
      const updatedComment = action.payload;

      const existingComment = state.comments.findIndex(
        (comment) => comment.id === updatedComment.id
      );

      if (state.comments[existingComment]) {
        state.comments[existingComment] = updatedComment;
      }
    },
  },
});

export default CommentSlice;
