import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JwtUserService } from './jwt-user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('jwt-user')
export class JwtUserController {
  constructor(private readonly jwtUserService: JwtUserService) {}

  @Post('login')
  async login(@Body() user: LoginDto) {
    const foundUser = await this.jwtUserService.login(user);

    if (foundUser) {
      return 'login success';
    } else {
      return 'login fail';
    }
  }

  @Post('register')
  async register(@Body() user: RegisterDto) {
    return await this.jwtUserService.register(user);
  }
}
