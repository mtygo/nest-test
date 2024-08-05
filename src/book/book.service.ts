import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DbService } from 'src/db/db.service';
import { Book } from './entities/book.entity';
import { randomInt } from 'crypto';

@Injectable()
export class BookService {
  @Inject()
  dbService: DbService;

  async list(key: string) {
    const books: Book[] = await this.dbService.read();
    if (key) {
      return books.filter(
        (item) =>
          item.name.includes(key) ||
          item.author.includes(key) ||
          item.description.includes(key),
      );
    }
    return books;
  }

  async detail(id: number) {
    const books: Book[] = await this.dbService.read();
    return books.find((book) => book.id === id);
  }

  async create(createBookDto: CreateBookDto) {
    const books: Book[] = await this.dbService.read();

    const book = new Book();
    book.id = randomInt(100000000);
    book.author = createBookDto.author;
    book.name = createBookDto.name;
    book.description = createBookDto.description;
    book.cover = createBookDto.cover;

    books.push(book);

    await this.dbService.write(books);
    return book;
  }

  async update(updateBookDto: UpdateBookDto) {
    const books: Book[] = await this.dbService.read();
    const foundBook = books.findIndex((book) => book.id === updateBookDto.id);
    if (foundBook === -1) {
      throw new BadRequestException('该图书不存在');
    }

    const updatedBooks = books.map((book, index) => {
      if (index === foundBook) {
        return {
          ...book,
          author: updateBookDto.author,
          cover: updateBookDto.cover,
          description: updateBookDto.description,
          name: updateBookDto.name,
        };
      }
      return book;
    });

    await this.dbService.write(updatedBooks);

    return updatedBooks;
  }

  async delete(id: number) {
    const books: Book[] = await this.dbService.read();
    const foundBook = books.findIndex((book) => book.id === id);
    if (foundBook === -1) {
      throw new BadRequestException('该图书不存在');
    }
    const updatedBooks = books.filter((book, index) => index !== foundBook);
    await this.dbService.write(updatedBooks);
    return updatedBooks;
  }
}
