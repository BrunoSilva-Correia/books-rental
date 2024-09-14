import { BookEntity } from '../../entities';
import { BookDto } from '../dtos/book.dto';
import { UserMapper } from './user.mapper';

export class BookMapper {
    static toDomain(data: BookDto): BookEntity {
        return new BookEntity({
            author: data.author,
            image: data.image,
            title: data.title,
            isRented: data.is_rented,
            rentedBy: data.rented_by
                ? UserMapper.toDomain(data.rented_by)
                : null,
        });
    }

    static toHttp(data: BookEntity): BookDto {
        return {
            id: data.id,
            author: data.author,
            image: data.image,
            title: data.title,
            is_rented: data.isRented,
            rented_by: data.rentedBy ? UserMapper.toHttp(data.rentedBy) : null,
        };
    }
}
