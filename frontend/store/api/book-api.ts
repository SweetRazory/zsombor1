import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiURL } from "../../constants";
import {
  BookResponseDto,
  BooksResponseDto,
} from "../../../backend/src/book/dto";

const loggingFetchBaseQuery = (options: any) => {
  const baseQuery = fetchBaseQuery(options);

  return async (args: any, api: any, extraOptions: any) => {
    return baseQuery(args, api, extraOptions);
  };
};

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: loggingFetchBaseQuery({
    baseUrl: apiURL,
  }),
  endpoints: (builder) => ({
    getAllBooks: builder.mutation<BooksResponseDto, void>({
      query: () => ({
        url: `/book/all`,
        method: "GET",
      }),
    }),
    toggleActiveBook: builder.mutation<BookResponseDto, string>({
      query: (bookId) => ({
        url: `/book/${bookId}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetAllBooksMutation: useGetAllBooks,
  useToggleActiveBookMutation: useToggleActiveBook,
} = bookApi;
