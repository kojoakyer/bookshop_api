import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { Cloudinary } from './cloudinary';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [BookModule, CartModule, OrderModule, CloudinaryModule, UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/bookshopDb')],
  controllers: [AppController],
  providers: [AppService, Cloudinary],
})
export class AppModule {}
