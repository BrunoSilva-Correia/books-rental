import { UserEntity } from '../../entities';
import { UserDto } from '../dtos/user.dto';

export class UserMapper {
    static toDomain(data: UserDto): UserEntity {
        const user = new UserEntity({
            email: data.email,
            name: data.name,
            phone: data.phone,
            password: data.password,
        });

        if (data.id) {
            user.id = data.id;
        }

        return user;
    }

    static toHttp(data: UserEntity): UserDto {
        return {
            id: data.id,
            email: data.email,
            name: data.name,
            phone: data.phone,
        };
    }
}
