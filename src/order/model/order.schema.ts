import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type OrderDocument = Order & Document

@Schema()
export class Order{
    @Prop({required:true})
    userId: string

    @Prop({required:true})
    books: [
        {
            bookId:{
                type:string
            },
            
            quantity:{
                type:number,
                default:1
            }
            
        }
    ]

    @Prop({required:true})
    amount: number

    @Prop({default: Date.now() })
    createdDate: Date

}


export const OrderSchema = SchemaFactory.createForClass(Order)

