// import { useEffect, useState } from "react";

import { useLayoutEffect } from "react";
import { RootState, store } from "../store/store";
import { Provider, useSelector } from "react-redux";
import { useGetAllBooks, useToggleActiveBook } from "../store/api";

// Ezen stílusok használata ajánlott -- de nem kötelező
const tableStyle =
  "flex flex-col items-center shadow-lg w-3/4 justify-center m-auto mt-4";
const headerRowStyle = "flex flex-row bg-gray-700 text-white p-2 w-full"; // a táblázat fejlécéhez
const bodyRowStyle =
  "flex flex-row bg-gray-200 text-black border-b border-gray-400 p-2 w-full"; // a sorok, melyek nincsenek kijelölve
const selectedRowStyle =
  "flex flex-row bg-gray-400 text-white border-b border-gray-400 p-2 w-full"; // kijelölt sorok
const totalRowStyle =
  "flex flex-row bg-red-900 text-white border-b border-gray-400 p-2 mt-2 w-full"; // a sor stílusa, mely az oldalszámokat összegzi
const newRowStyle =
  "flex flex-row bg-cyan-900 text-white border-b border-gray-400 p-2 w-full"; // for the row showing the sum of the worldwide gross of selected rows
const cellStyle = "flex-none w-42 p-1"; // általános cellastílus
const cellTitleStyle = "p-1 flex-4"; // a cím oszlophoz tartozó stílus
const cellAuthorStyle = "p-1 flex-2"; // a Szerző oszlophoz tartozó stílus

export default function BookList() {
  const books = useSelector((state: RootState) => state.book);
  const [getAllBooks, getAllBooksRequest] = useGetAllBooks();
  const [toggleActiveBook] = useToggleActiveBook();

  useLayoutEffect(() => {
    getAllBooks();
  }, []);

  // a 2020-ban, vagy azután kiadott könyvek száma
  const totalBooks = books.filter((book) => book.year >= 2020).length;

  // a kattintással kiválasztott könyvek esetében az oldalszámok összege
  const selectedBooks = books
    .filter((book) => book.active)
    .reduce((sum, book) => sum + book.pages, 0);

  // a sorokra kattintás lekezelése
  const toggleActive = (id: string) => {
    toggleActiveBook(id);
  };

  if (getAllBooksRequest.isLoading) {
    return <div className="p-4 text-center">Loading books...</div>;
  }

  return (
    <div className={tableStyle}>
      <div className={headerRowStyle}>
        <div className={cellTitleStyle}>Cím</div>
        <div className={cellAuthorStyle}>Szerző</div>
        <div className={cellStyle}>Oldalszám</div>
        <div className={cellStyle}>Év</div>
      </div>
      {/* Generálja le a sorokat a beimportált adatokból */}
      {books.map((book) => (
        <div
          key={book.id}
          className={book.active ? selectedRowStyle : bodyRowStyle}
          onClick={() => toggleActive(book.id)}
        >
          <div className={cellTitleStyle}>{book.title}</div>
          <div className={cellAuthorStyle}>{book.author}</div>
          <div className={cellStyle}>{book.pages}</div>
          <div className={cellStyle}>{book.year}</div>
        </div>
      ))}

      {/* Készítsen egy sort a 2020-ban, vagy azután kiadott könyvek számának megjelenítéséhez */}
      <div className={totalRowStyle}>
        <div className={cellTitleStyle}>Books published in 2020 or later:</div>
        <div className={cellAuthorStyle}></div>
        <div className={cellStyle}>{totalBooks}</div>
        <div className={cellStyle}></div>
      </div>

      {/* Készítsen egy sort a kattintással kiválasztott könyvek oldalszámainak összegzéséhez */}
      <div className={newRowStyle}>
        <div className={cellTitleStyle}>Total pages of selected books:</div>
        <div className={cellAuthorStyle}></div>
        <div className={cellStyle}>{selectedBooks}</div>
        <div className={cellStyle}></div>
      </div>
    </div>
  );
}
