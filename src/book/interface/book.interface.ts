import { Document } from 'mongoose';

export interface IBook extends Document{
    readonly title: string;
    readonly description: number;
    readonly picture: string;
    readonly quantity: number;

}