import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { APP_GUARD } from '@nestjs/core';
import { LoginGuard } from 'src/login.guard';
import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';
import { BookModule } from './book/book.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from 'config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtUserModule } from './jwt-user/jwt-user.module';
import { JwtUser } from './jwt-user/entities/jwt-user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PersonModule,
    UserModule,
    DbModule,
    BookModule,
    JwtUserModule,
    ConfigModule.forRoot({
      load: [config],
    }),

    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [config],
        }),
      ],
      async useFactory(configService: ConfigService) {
        return {
          type: 'mysql',
          username: configService.get('mysql.username'),
          password: configService.get('mysql.password'),
          host: configService.get('mysql.host'),
          port: configService.get('mysql.port'),
          database: 'login_test',
          synchronize: true,
          logging: true,
          entities: [JwtUser],
          poolSize: 10,
          connectorPackage: 'mysql2',
          extra: {
            authPlugin: 'sha256_password',
          },
        };
      },
      inject: [ConfigService],
    }),
    JwtModule.register({
      global: true,
      secret: 'fcc',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    //  { provide: APP_GUARD, useClass: LoginGuard }
  ],
})
export class AppModule {}
