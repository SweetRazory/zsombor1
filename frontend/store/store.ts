import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { bookReducer } from "./slices";
import { bookApi } from "./api";

const apiReducers = {
  [bookApi.reducerPath]: bookApi.reducer,
};

const sessionReducers = {
  book: bookReducer,
};

export const store = configureStore({
  reducer: {
    ...apiReducers,
    ...sessionReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
