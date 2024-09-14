import { users } from '@prisma/client';
import { UserEntity } from '../../entities';

export class UserMapper {
    static toDomain(data: users): UserEntity {
        return new UserEntity({
            id: data.id_user,
            email: data.email,
            name: data.name,
            password: data.password,
            phone: data.phone,
        });
    }

    static toDatabase(data: UserEntity): Omit<users, 'id_user'> {
        return {
            email: data.email,
            name: data.name,
            phone: data.phone,
            password: data.password,
        };
    }
}
