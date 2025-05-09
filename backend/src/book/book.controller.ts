import {
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookResponseDto, BooksResponseDto } from './dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  logger = new Logger(BookController.name);

  @Get('all')
  async getAllBooks(): Promise<BooksResponseDto> {
    try {
      const result = await this.bookService.getAllBooks();

      return new BooksResponseDto(result);
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException();
    }
  }

  @Patch(':bookId')
  async toggleActiveBook(
    @Param('bookId') bookId: string,
  ): Promise<BookResponseDto> {
    try {
      const result = await this.bookService.toggleActiveBook(bookId);

      return new BookResponseDto(result);
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException();
    }
  }
}
