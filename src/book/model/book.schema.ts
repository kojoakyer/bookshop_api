import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  author: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  picture: string;

  @Prop({ default: Date.now() })
  createdDate: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);