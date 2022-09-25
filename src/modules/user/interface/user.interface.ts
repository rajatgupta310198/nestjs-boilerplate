import { Document } from 'mongoose';

export interface User extends Document {
    readonly name: string;
    readonly email: string;
    readonly password: string;
}

export interface IUserCreate {
    readonly name: string;
    readonly email: string;
    readonly password: string;
}

export interface IUser {
    readonly _id?: string;
    readonly name: string;
    readonly email: string;
}
