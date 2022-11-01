
import { IsBoolean, IsNotEmpty, IsNumber, IsString, MaxLength} from "class-validator";
export class CreateUserDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly fullname: string;
    
    @IsString()
    @IsNotEmpty()
    readonly email: string;
    
    @IsNumber()
    @IsNotEmpty()
    readonly password: string;


    @IsBoolean()
    readonly isAdmin: boolean

}
