import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookSchema } from './model/book.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
CloudinaryModule],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
