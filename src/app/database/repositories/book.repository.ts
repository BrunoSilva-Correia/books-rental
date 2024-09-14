import { BookEntity } from '../../entities';
import { database } from '../database';
import { BookMapper } from '../mappers/book.mapper';

class BookRepository {
    private database = database;

    async findById(id: number): Promise<BookEntity | null> {
        const bookData = await this.database.books.findUnique({
            where: { id_book: id },
            include: {
                rented_by: true,
            },
        });

        if (!bookData) {
            return null;
        }

        return BookMapper.toDomain(bookData);
    }

    async findAll(): Promise<BookEntity[] | null> {
        const booksData = await this.database.books.findMany({
            include: {
                rented_by: true,
            },
        });

        if (!booksData.length) {
            return null;
        }

        return booksData.map(BookMapper.toDomain);
    }

    async create(book: BookEntity): Promise<BookEntity> {
        const bookData = BookMapper.toDatabase(book);

        const createdBook = await this.database.books.create({
            data: bookData,
            include: {
                rented_by: true,
            },
        });

        return BookMapper.toDomain(createdBook);
    }

    async update(id: number, book: BookEntity): Promise<BookEntity> {
        const bookData = BookMapper.toDatabase(book);
        const updatedBook = await this.database.books.update({
            where: {
                id_book: id,
            },
            include: {
                rented_by: true,
            },
            data: bookData,
        });
        return BookMapper.toDomain(updatedBook);
    }

    async delete(id: number) {
        const data = await this.findById(id);
        if (!data) {
            return;
        }

        await this.database.books.delete({
            where: {
                id_book: id,
            },
        });
    }
}

export const bookRepository = new BookRepository();
