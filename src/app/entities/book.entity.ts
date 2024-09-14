import { UserEntity } from './user.entity';

export interface BookEntityProps {
    id?: number;
    title: string;
    author: string;
    image: string;
    isRented: boolean;
    rentedBy?: UserEntity;
}

export class BookEntity {
    private props: BookEntityProps;

    constructor(props: BookEntityProps) {
        this.props = props;
    }

    public set id(id: number) {
        this.props.id = id;
    }
    public get id(): number | null {
        return this.props.id ?? null;
    }

    public set title(title: string) {
        this.props.title = title;
    }
    public get title(): string {
        return this.props.title;
    }

    public set author(author: string) {
        this.props.author = author;
    }
    public get author(): string {
        return this.props.author;
    }

    public set image(image: string) {
        this.props.image = image;
    }
    public get image(): string {
        return this.props.image;
    }

    public set isRented(isRented: boolean) {
        this.props.isRented = isRented;
    }
    public get isRented(): boolean {
        return this.props.isRented;
    }

    public set rentedBy(rentedBy: UserEntity) {
        this.props.rentedBy = rentedBy;
    }
    public get rentedBy(): UserEntity | null {
        return this.props.rentedBy ?? null;
    }
}
