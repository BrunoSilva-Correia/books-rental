import { bookRepository } from '../database/repositories/book.repository';
import { UserEntity } from '../entities';
import { BookDto } from './dtos/book.dto';
import { UserDto } from './dtos/user.dto';
import { BookMapper } from './mappers/book.mapper';
import { UserMapper } from './mappers/user.mapper';
import { UserService } from './user.service';

export class BookService {
    private service = bookRepository;
    userService: UserService = new UserService();

    public async get() {
        const books = await this.service.findAll();

        return {
            status: 200,
            data: books?.length ? books.map(BookMapper.toHttp) : [],
        };
    }

    public async getById(id: number) {
        const data = await this.service.findById(Number(id));
        if (!data) {
            return {
                status: 404,
                data: { message: `Book with id ${id} not found` },
            };
        }

        return { status: 200, data: BookMapper.toHttp(data) };
    }

    public async create(body: BookDto) {
        try {
            body.isRented = false;
            const data = BookMapper.toDomain(body);
            const created = await this.service.create(data);
            return { status: 201, data: BookMapper.toHttp(created) };
        } catch (err) {
            return { status: 500, data: { message: err } };
        }
    }

    public async update(id: number, body: BookDto) {
        const data = await this.service.findById(id);

        if (!data) {
            return { status: 404, data: {} };
        }

        try {
            data.author = body.author;
            data.image = body.image;
            data.title = body.title;
            const updated = await this.service.update(id, data);
            return { status: 201, data: BookMapper.toHttp(updated) };
        } catch (err) {
            return { status: 500, data: { message: err } };
        }
    }

    public async delete(id: number) {
        const data = await this.service.findById(id);

        if (!data) {
            return { status: 404, data: {} };
        }

        await this.service.delete(id);

        return { status: 204, data: {} };
    }

    public async rent(idBook: number, idUser: number) {
        const book = await this.service.findById(idBook);

        if (!book) {
            return {
                status: 404,
                data: { message: `Book with id ${idBook} not found` },
            };
        }

        const user = await this.userService.getById(idUser);
        if (user.status == 404) {
            return user;
        }

        const userData = user.data as UserDto;

        book.isRented = true;
        book.rentedBy = UserMapper.toDomain(userData);

        const rented = await this.service.update(idBook, book);

        return { status: 200, data: BookMapper.toHttp(rented) };
    }

    public async handBack(idBook: number, idUser: number) {
        const book = await this.service.findById(idBook);

        if (!book) {
            return {
                status: 404,
                data: { message: `Book with id ${idBook} not found` },
            };
        }

        const user = await this.userService.getById(idUser);

        if (user.status == 404) {
            return user;
        }

        book.isRented = false;
        book.rentedBy = null;

        const rented = await this.service.update(idBook, book);

        return { status: 200, data: BookMapper.toHttp(rented) };
    }
}
