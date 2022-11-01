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
import { Order } from './model/order.schema';
import { OrderService } from './order.service';
//   import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

  
//   @ApiBearerAuth()
//   @ApiTags('cart')
  @Controller('order')
  export class OrderController {
    constructor(private orderService: OrderService) {}
  
    @Post()
    async createOrder(
      @Res() response,
      @Body() order: Order,
    ) {
      const newOrder = await this.orderService.createOrder(order);
      return response.status(HttpStatus.CREATED).json({
        newOrder,
      });
    }
  
    @Get()
    async read() {
      return await this.orderService.readAllOrder();
    }

  
      
    @Get('/:id')
    async getOrder(@Param('id') id: string) {
      return this.orderService.readOrder(id);
    }
  
  
    @Delete('/:id')
    async delete(@Res() response, @Param('id') id) {
      const cart = await this.orderService.delete(id);
      return response.status(HttpStatus.OK).json({
          cart
      })
    }
  }
  