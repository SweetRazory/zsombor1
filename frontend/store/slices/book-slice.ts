import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../../../backend/node_modules/@prisma/client";
import { bookApi } from "../api";

const initialState: Book[] = [];

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(
        bookApi.endpoints.getAllBooks.matchFulfilled,
        (_, { payload }) => payload.books,
      )
      .addMatcher(
        bookApi.endpoints.toggleActiveBook.matchFulfilled,
        (state, { payload }) => {
          const idx = state.findIndex((book) => book.id === payload.id);
          if (idx !== -1) {
            state[idx] = payload;
          }
        },
      );
  },
});

export const {} = bookSlice.actions;

export const bookReducer = bookSlice.reducer;
