import { BadRequestException, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Cart,CartDocument } from './model/cart.schema';


@Injectable()
export class CartService {
    constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) { }

    async createCart(cart: Cart): Promise<Cart> {
        
        const newCart = new this.cartModel({
            userId:cart.userId,
            books:{
                bookId:cart,
                quantity:cart
            },
            
        
        })

        return newCart.save();
    }

    async readAllCart(): Promise<any> {
        return this.cartModel.find()
    }


    async readCart(id:string): Promise<any> {
        return this.cartModel.findOne({_id:id}).exec();
    }


    
    async delete(id: string): Promise<any> {
        return await this.cartModel.findByIdAndRemove({_id:id}).exec();
    }

}
