import { Document } from 'mongoose';

export interface IBook extends Document{
    readonly fullname: string;
    readonly email: string;
    readonly password: string;
    readonly isAdmin: {
        type:string,
        default:false
    };

}