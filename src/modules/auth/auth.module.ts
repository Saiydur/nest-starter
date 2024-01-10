import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import JwtConfigService from 'src/core/jwt/jwt-config.service';
import { UsersModule } from '../users/users.module';
import { Otp } from './entities/otp.entity';
import { OtpsService } from './services/otps.service';
import { OtpsRepository } from './otps.repository';
import JwtClient from 'src/core/jwt/jwt.client';
import { HttpClient } from 'src/core/client/http.client';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Otp]),
    UsersModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, OtpsService, OtpsRepository, JwtClient, HttpClient],
})
export class AuthModule {}
