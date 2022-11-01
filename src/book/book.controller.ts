import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Patch,
    Post,
    Put,
    Query,
    Req,
    Res,
    UnauthorizedException,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
import path from 'path';
import { CurrentUser } from 'src/user/current-user.decorator';
import { User } from 'src/user/model/user.schema';
//   import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

  
//   @ApiBearerAuth()
//   @ApiTags('cart')
  @Controller('book')
  export class BookController {
    constructor(private bookService: BookService) {}
  
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createBook(
      @Res() response,
      @Body() createBookDto: CreateBookDto,
      @UploadedFile() file: Express.Multer.File,
      @CurrentUser() user:User
    ) {
      console.log(user)
      if(user.isAdmin){
        const newBook = await this.bookService.createBook(createBookDto, file);
        return response.status(HttpStatus.CREATED).json({
          newBook,
        });
      }

      throw new UnauthorizedException('user is not admin')
   
    }
  
    @Get()
    async read() {
      return await this.bookService.readAllBook();
    }
  

    @Get('/search')
    async search(  @Req() req, @Query() query:string ) {
      return this.bookService.searchBook(req);
    }
  
      
    @Get('/:id')
    async stream(@Param('id') id: string) {
      return this.bookService.readBook(id);
    }


  



    @Patch('/:id')
    async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto,  @CurrentUser() user:User) {
      if(user.isAdmin){
        return this.bookService.update(id,updateBookDto);
      }
      throw new UnauthorizedException('user is not admin')
    }
  
  
  
    @Delete('/:id')
    async delete(@Res() response, @Param('id') id,  @CurrentUser() user:User) {
      if(user.isAdmin){
        const  deletedBook =  await this.bookService.delete(id);
        return response.status(HttpStatus.OK).json({
            deletedBook
        })
      }
      throw new UnauthorizedException('user is not admin')
      
    }
  }
  