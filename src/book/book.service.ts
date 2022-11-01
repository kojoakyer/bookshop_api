import { BadRequestException, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, BookDocument } from './model/book.schema';


@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>,private cloudinary:CloudinaryService) { }

    async createBook(createBookDto: CreateBookDto, file: Express.Multer.File): Promise<Book> {
        const result = await this.cloudinary.uploadImage(file)
        // .catch(()=>{
        //     throw new BadRequestException('Invalid file type ok')
        // })
        console.log(result);
        
        const newBook =  new this.bookModel({
            title:createBookDto.title,
            quantity:   createBookDto.quantity,
            description:createBookDto.description,
            author:createBookDto.author,
            picture: result.secure_url
            // cloudinary_id:result.public_id
        })

        return newBook.save();
    }

    async readAllBook(): Promise<any> {
        return this.bookModel.find()
    }

    
    async readBook(id:string): Promise<any> {
        return this.bookModel.findOne({_id:id}).exec();
    }

    async searchBook(req): Promise<any> {

        let options = {}

        if(req.query.s){
             options = {
                $or:[
                    {title:new RegExp(req.query.s.toString())}
                ]
            }
        }

        const data = this.bookModel.find(options)

        return data
    
    }


    async update(id:string, updateBookDto: UpdateBookDto): Promise<Book> {

         const updatedBook = await this.bookModel.findByIdAndUpdate(({_id:id})._id, updateBookDto,{new:true})

         return updatedBook.save()
    }

    
    async delete(id: string): Promise<any> {
        return await this.bookModel.findByIdAndRemove({_id:id}).exec();
    }

}
