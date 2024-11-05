import { Body, HttpException, Injectable, Logger, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtUser } from './entities/jwt-user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as crypto from 'crypto';
import { LoginDto } from './dto/login.dto';

function md5(str: string): string {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

@Injectable()
export class JwtUserService {
  private logger = new Logger();
  @InjectRepository(JwtUser)
  private userRepository: Repository<JwtUser>;

  async register(user: RegisterDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    });
    console.log(user, foundUser);

    if (foundUser) {
      throw new HttpException('用户已存在', 200);
    }

    const newUser = new JwtUser();
    newUser.username = user.username;
    newUser.password = md5(user.password);

    try {
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch (e) {
      this.logger.error(e, JwtUserService);
      return '注册失败';
    }
  }

  async login(user: LoginDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    });

    if (!foundUser) {
      throw new HttpException('用户名不存在', 200);
    }
    if (foundUser.password !== md5(user.password)) {
      throw new HttpException('密码错误', 200);
    }
    return foundUser;
  }
}
