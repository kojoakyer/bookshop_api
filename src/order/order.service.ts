import { BadRequestException, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './model/order.schema';


@Injectable()
export class OrderService {
    constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) { }

    async createOrder(order: Order): Promise<Order> {
        
        const newOrder = new this.orderModel({
          amount:order.amount,
          books:{
            bookId:order,
            quantity:order
          },
          userId:order.userId,
            
        
        })

        return newOrder.save();
    }

    async readAllOrder(): Promise<any> {
        return this.orderModel.find()
    }


    async readOrder(id:string): Promise<any> {
        return this.orderModel.findOne({_id:id}).exec();
    }


    
    async delete(id: string): Promise<any> {
        return await this.orderModel.findByIdAndRemove({_id:id}).exec();
    }

}
