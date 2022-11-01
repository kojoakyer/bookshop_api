import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Res,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
import { CartService } from './cart.service';
import { Cart } from './model/cart.schema';
//   import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

  
//   @ApiBearerAuth()
//   @ApiTags('cart')
  @Controller('cart')
  export class CartController {
    constructor(private cartService: CartService) {}
  
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createCart(
      @Res() response,
      @Body() cart: Cart,
  
    ) {
      const newCart = await this.cartService.createCart(cart);
      return response.status(HttpStatus.CREATED).json({
        newCart,
      });
    }
  
    @Get()
    async read() {
      return await this.cartService.readAllCart();
    }

  
      
    @Get('/:id')
    async getCart(@Param('id') id: string) {
      return this.cartService.readCart(id);
    }
  
  
    @Delete('/:id')
    async delete(@Res() response, @Param('id') id) {
      const cart = await this.cartService.delete(id);
      return response.status(HttpStatus.OK).json({
          cart
      })
    }
  }
  