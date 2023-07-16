export interface Account {
    username: string;
    password: string;
    role: Role;
}

export enum Role {
    ADMIN = "admin",
    USER = "user",
}