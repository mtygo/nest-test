import { Module } from '@nestjs/common';
import { JwtUserService } from './jwt-user.service';
import { JwtUserController } from './jwt-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtUser } from './entities/jwt-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JwtUser])],
  controllers: [JwtUserController],
  providers: [JwtUserService],
})
export class JwtUserModule {}
