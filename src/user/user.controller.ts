import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './model/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
// import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

// @ApiBearerAuth()
// @ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('/signup')
  async SignUp(@Res() response, @Body() createUserDto: CreateUserDto) {
    const newUSer = await this.userService.signup(createUserDto);
    return response.status(HttpStatus.CREATED).json({
      newUSer,
    });
  }

  @Post('/signin')
  async SignIn(@Res() response, @Body() createUserDto: CreateUserDto) {
    const token = await this.userService.signin(createUserDto, this.jwtService);
    return response.status(HttpStatus.OK).json(token);
  }
}
