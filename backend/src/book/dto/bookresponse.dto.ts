import { Book } from '@prisma/client';
import { Expose } from 'class-transformer';

export class BookResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  author: string;

  @Expose()
  pages: number;

  @Expose()
  year: number;

  @Expose()
  active: boolean;

  constructor(book: Book) {
    Object.keys(book).forEach((e) => (this[e] = book[e]));
  }
}
