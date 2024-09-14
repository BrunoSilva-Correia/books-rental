import { UserDto } from './user.dto';

export type BookDto = {
    id?: number;
    title: string;
    author: string;
    image: string;
    is_rented: boolean;
    rented_by?: UserDto;
};
