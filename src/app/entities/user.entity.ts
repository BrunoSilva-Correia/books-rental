export interface UserEntityProps {
    id?: number;
    name: string;
    email: string;
    phone: string;
    password: string;
}

export class UserEntity {
    private props: UserEntityProps;

    constructor(props: UserEntityProps) {
        this.props = props;
    }

    public set id(id: number) {
        this.props.id = id;
    }
    public get id(): number | null {
        return this.props.id ?? null;
    }

    public set name(name: string) {
        this.props.name = name;
    }
    public get name(): string {
        return this.props.name;
    }

    public set email(email: string) {
        this.props.email = email;
    }
    public get email(): string {
        return this.props.email;
    }

    public set phone(phone: string) {
        this.props.phone = phone;
    }
    public get phone(): string {
        return this.props.phone;
    }

    public set password(password: string) {
        this.props.password = password;
    }
    public get password(): string {
        return this.props.password;
    }
}
