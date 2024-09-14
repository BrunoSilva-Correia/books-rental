import { books, Prisma } from '@prisma/client';
import { UserMapper } from './user.mapper';
import { BookEntity } from '../../entities';

type booksWithUser = Prisma.booksGetPayload<{
    include: {
        rented_by: true;
    };
}>;

export class BookMapper {
    static toDomain(data: booksWithUser): BookEntity {
        const book = new BookEntity({
            id: data.id_book,
            title: data.title,
            author: data.author,
            image: data.image,
            isRented: data.is_rented,
            rentedBy: data.rented_by
                ? UserMapper.toDomain(data.rented_by)
                : undefined,
        });
        return book;
    }

    static toDatabase(data: BookEntity): Omit<books, 'id_book'> {
        return {
            title: data.title,
            author: data.author,
            image: data.image,
            is_rented: data.isRented,
            rented_by_id: data.rentedBy?.id ?? null,
        };
    }
}
