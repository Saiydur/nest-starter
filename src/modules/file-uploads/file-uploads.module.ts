import { Module } from '@nestjs/common';
import { FileUploadsService } from './file-uploads.service';
import { FileUploadsController } from './file-uploads.controller';
import { UsersModule } from '../users/users.module';
import { MulterModule } from '@nestjs/platform-express';
import { JwtModule } from '@nestjs/jwt';
import JwtConfigService from 'src/core/jwt/jwt-config.service';
import JwtClient from 'src/core/jwt/jwt.client';

@Module({
  imports: [
    UsersModule,
    MulterModule.register({
      dest: process.env.IMAGE_FOLDER,
    }),
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
  ],
  controllers: [FileUploadsController],
  providers: [FileUploadsService, JwtClient],
})
export class FileUploadsModule {}
