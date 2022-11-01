import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './model/user.schema';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    async signup(createUserDto: CreateUserDto): Promise<User>{
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(createUserDto.password, salt)

        const reqBody ={
            fullname: createUserDto.fullname,
            email: createUserDto.email,
            password: hash,
            isAmin:createUserDto.isAdmin
        }

        const newUser = new this.userModel(reqBody)

        return newUser.save()
    }


    async signin(createUserDto: CreateUserDto, jwt:JwtService): Promise<any>{

        // find the user
        const foundUser = await this.userModel.findOne({email:createUserDto.email}).exec()

        // compare password
        if(foundUser){
            const {password}= foundUser
            if(bcrypt.compare(createUserDto.password,password)){
                const payload = {email:createUserDto.email, fullname:createUserDto.fullname};
                return {
                    token: jwt.sign(payload),
                };
            }
            return new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED)
        }
        return new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED)
    }

    async getOne(email): Promise<User> {
        return await this.userModel.findOne({ email }).exec();
    }
}
