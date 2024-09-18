import { UserDto } from './user.dto';

export type BookDto = {
    id?: number;
    title: string;
    author: string;
    image: string;
    isRented: boolean;
    rentedBy?: UserDto;
};
