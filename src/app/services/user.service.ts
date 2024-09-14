import { userRepository } from '../database/repositories/user.repository';
import { UserDto } from './dtos/user.dto';
import { UserMapper } from './mappers/user.mapper';
import bcrypt from 'bcryptjs';

export class UserService {
    private service = userRepository;

    public async get() {
        const users = await this.service.findAll();

        return {
            status: 200,
            data: users?.length ? users.map(UserMapper.toHttp) : [],
        };
    }

    public async getById(id: number) {
        const data = await this.service.findById(Number(id));
        if (!data) {
            return {
                status: 404,
                data: { message: `User with id ${id} not found` },
            };
        }

        return { status: 200, data: UserMapper.toHttp(data) };
    }

    public async create(body: UserDto) {
        try {
            const userExists = await this.service.findByEmail(body.email);

            if (userExists) {
                return {
                    status: 409,
                    data: {
                        message: `User with email ${body.email} already exists`,
                    },
                };
            }

            body.password = await this.hashPassword(body.password);
            const data = UserMapper.toDomain(body);
            const created = await this.service.create(data);
            return { status: 201, data: UserMapper.toHttp(created) };
        } catch (err) {
            return { status: 500, data: { message: err } };
        }
    }

    public async update(id: number, body: UserDto) {
        const data = await this.service.findById(id);

        if (!data) {
            return { status: 404, data: {} };
        }

        try {
            const emailExists = await this.service.findByEmail(body.email);

            if (emailExists) {
                return {
                    status: 409,
                    data: {
                        message: `User with email ${body.email} already exists`,
                    },
                };
            }

            if (body.password) {
                body.password = await this.hashPassword(body.password);
            }

            const data = UserMapper.toDomain(body);
            const updated = await this.service.update(id, data);
            return { status: 201, data: UserMapper.toHttp(updated) };
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

    public async login(email: string, password: string) {
        try {
            const foundUser = await this.service.findByEmail(email);

            if (!foundUser) {
                return {
                    status: 401,
                    data: { message: 'Invalid email or password' },
                };
            }

            const isMatch = await bcrypt.compare(password, foundUser.password);
            if (isMatch) {
                return { status: 200, data: UserMapper.toHttp(foundUser) };
            } else {
                return {
                    status: 401,
                    data: { message: 'Invalid email or password' },
                };
            }

            return { status: 200, data: UserMapper.toHttp(foundUser) };
        } catch (error) {
            return { status: 500, data: { message: 'Internal server error' } };
        }
    }

    private async hashPassword(password: string) {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }
}
