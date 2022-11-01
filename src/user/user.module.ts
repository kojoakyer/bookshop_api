import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import { secret } from '../utils/constants';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { isAuthenticated } from 'src/app.middleware';
import { BookController } from 'src/book/book.controller';
import { OrderController } from 'src/order/order.controller';

@Module({
  imports:[ 
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '3h' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthenticated)
      .exclude({ path: '/book', method: RequestMethod.GET},{ path: '/book/search', method: RequestMethod.GET},{ path: '/book/:id', method: RequestMethod.GET},
      { path: '/cart', method: RequestMethod.POST},{ path: '/cart', method: RequestMethod.GET},{ path: '/cart/:id', method: RequestMethod.GET},
      { path: '/order', method: RequestMethod.POST},{ path: '/order/:id', method: RequestMethod.GET},{ path: '/order/:id', method: RequestMethod.GET})
      .forRoutes(BookController,OrderController);
  }
}
