
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength} from "class-validator";
export class UpdateBookDto {

    @IsOptional()
    @Exclude()
    _id?: string;

    
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    title: string;
    
    @IsString()
    @IsNotEmpty()
    description: string;

    // @IsString()
    // readonly author: string;
    
    // @IsString()
    // @IsNotEmpty()
    // readonly picture: string;


    @IsNumber()
    @IsNotEmpty()
    quantity: number;

}