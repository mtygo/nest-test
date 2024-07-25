import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { APP_GUARD } from '@nestjs/core';
import { LoginGuard } from 'src/login.guard';
import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [PersonModule, UserModule, DbModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: LoginGuard }],
})
export class AppModule {}
