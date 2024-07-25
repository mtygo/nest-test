import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  @Inject(DbService)
  dbService: DbService;

  async register(registerUserDto: RegisterUserDto) {
    const users: User[] = await this.dbService.read();
    const hasFoundUser = users.find(
      (user) => user.userName === registerUserDto.userName,
    );
    if (hasFoundUser) {
      throw new BadRequestException('用户名已存在');
    }

    const user = new User();
    user.userName = registerUserDto.userName;
    user.password = registerUserDto.password;
    users.push(user);

    await this.dbService.write(users);
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const { userName, password } = loginUserDto;
    const users: User[] = await this.dbService.read();
    const user = users.find((user) => user.userName === userName);
    if (!user) {
      throw new BadRequestException('用户不存在');
    }
    if (user.password !== password) {
      throw new BadRequestException('密码错误');
    }
    return user;
  }
}
