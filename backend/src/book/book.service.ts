import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllBooks() {
    return await this.prismaService.book.findMany({});
  }

  async toggleActiveBook(bookId: string) {
    return await this.prismaService.$transaction(async (prisma) => {
      const existingBook = await prisma.book.findFirst({
        where: { id: bookId },
      });

      if (!existingBook)
        throw new NotFoundException('Book with this ID was not found');

      return await prisma.book.update({
        where: {
          id: existingBook.id,
        },
        data: {
          active: !existingBook.active,
        },
      });
    });
  }
}
