import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtUserService } from './jwt-user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginGuard } from 'src/login.guard';
@Controller('jwt-user')
export class JwtUserController {
  constructor(private readonly jwtUserService: JwtUserService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @Post('login')
  // todo 如何不被UseGuards影响
  async login(
    @Body() user: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const foundUser = await this.jwtUserService.login(user);

    if (foundUser) {
      const token = await this.jwtService.signAsync({
        user: {
          id: foundUser.id,
          username: foundUser.username,
        },
      });
      console.log(token, 'token');
      res.setHeader('authorization', 'bearer ' + token);
      return 'login success';
    } else {
      return 'login fail';
    }
  }

  @Post('register')
  async register(@Body() user: RegisterDto) {
    return await this.jwtUserService.register(user);
  }

  @Get('aaa')
  @UseGuards(LoginGuard)
  async aaa() {
    return 'aaa';
  }
}
