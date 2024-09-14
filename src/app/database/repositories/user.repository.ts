import { UserEntity } from '../../entities';
import { database } from '../database';
import { UserMapper } from '../mappers/user.mapper';

class UserRepository {
    private database = database;

    async findById(id: number): Promise<UserEntity | null> {
        const userData = await this.database.users.findUnique({
            where: { id_user: id },
        });

        if (!userData) {
            return null;
        }

        return UserMapper.toDomain(userData);
    }

    async findAll(): Promise<UserEntity[] | null> {
        const usersData = await this.database.users.findMany();

        if (!usersData.length) {
            return null;
        }

        return usersData.map(UserMapper.toDomain);
    }

    async create(user: UserEntity): Promise<UserEntity> {
        const userData = UserMapper.toDatabase(user);

        const createdUser = await this.database.users.create({
            data: userData,
        });

        return UserMapper.toDomain(createdUser);
    }

    async update(id: number, user: UserEntity): Promise<UserEntity> {
        const userData = UserMapper.toDatabase(user);
        const updatedUser = await this.database.users.update({
            where: {
                id_user: id,
            },
            data: userData,
        });
        return UserMapper.toDomain(updatedUser);
    }

    async delete(id: number) {
        const data = await this.findById(id);
        if (!data) {
            return;
        }

        await this.database.users.delete({
            where: {
                id_user: id,
            },
        });
    }

    async findByEmail(email: string) {
        const data = await this.database.users.findFirst({
            where: {
                email,
            },
        });

        if (!data) {
            return null;
        }

        return UserMapper.toDomain(data);
    }
}

export const userRepository = new UserRepository();
