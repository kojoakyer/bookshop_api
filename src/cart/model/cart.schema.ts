import { Prop,Schema ,SchemaFactory } from "@nestjs/mongoose"



export type CartDocument = Cart & Document

@Schema()
export class Cart{
    @Prop({required:true})
    userId: string

    @Prop({required:true, unique:true, lowercase:true})
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

  
    @Prop({default: Date.now() })
    createdDate: Date

}


export const CartSchema = SchemaFactory.createForClass(Cart)

