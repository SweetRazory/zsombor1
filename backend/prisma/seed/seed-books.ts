import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';
import { uuid } from 'uuidv4';

const seedBooks = async (prisma: PrismaClient) => {
  const csvPath = path.join(__dirname, 'data', 'books.csv');
  const fileContent = fs.readFileSync(csvPath, 'utf-8');
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  for (const book of records) {
    await prisma.book.create({
      data: {
        id: uuid(),
        title: book.title,
        author: book.author,
        pages: Number(book.pages),
        year: Number(book.year),
        active: book.active === 'true',
      },
    });
  }
};

export default seedBooks;
