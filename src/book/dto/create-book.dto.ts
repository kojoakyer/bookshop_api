
import { IsNotEmpty, IsNumber, IsString, MaxLength} from "class-validator";
export class CreateBookDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly title: string;
    
    @IsString()
    @IsNotEmpty()
    readonly description: string;
    
    @IsString()
    @IsNotEmpty()
    readonly picture: string;

    @IsString()
    readonly author: string;


    @IsNumber()
    @IsNotEmpty()
    readonly quantity: number;

}
