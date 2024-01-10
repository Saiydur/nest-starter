import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import JwtConfigService from 'src/core/jwt/jwt-config.service';
import { UsersRepository } from './user.repository';
import JwtClient from 'src/core/jwt/jwt.client';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, JwtClient],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
