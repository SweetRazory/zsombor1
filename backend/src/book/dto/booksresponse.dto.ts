import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BookResponseDto } from './bookresponse.dto';

export class BooksResponseDto {
  @Expose()
  @Type(() => BookResponseDto)
  @ValidateNested({ each: true })
  books: BookResponseDto[];

  constructor(books: BookResponseDto[]) {
    this.books = books;
  }
}
