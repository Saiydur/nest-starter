import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerConfig } from './configs/envs/default';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { HttpModule } from '@nestjs/axios';
import 'winston-daily-rotate-file';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
      }),
    }),
    TypeOrmModule.forRoot({
      type: ServerConfig.db.type as any,
      host: ServerConfig.db.host,
      port: ServerConfig.db.port,
      username: ServerConfig.db.user,
      password: ServerConfig.db.password,
      database: ServerConfig.db.database,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads/',
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.DailyRotateFile({
          level: 'debug',
          filename: 'debug-%DATE%.log',
          dirname: 'logs',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.errors({ stack: true }),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf((info) => {
              return `${[info.timestamp]}|${
                info.message
              }|${info.level.toUpperCase()} STACK:\n${info.stack}`;
            }),
          ),
        }),
        new winston.transports.DailyRotateFile({
          level: 'error',
          filename: 'error-%DATE%.log',
          dirname: 'logs',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.errors({ stack: true }),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf((info) => {
              return `${[info.timestamp]}|${
                info.message
              }|${info.level.toUpperCase()} STACK:\n${info.stack}`;
            }),
          ),
        }),
      ],
      format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf((info) => {
          return `${[info.timestamp]}|${
            info.message
          }|${info.level.toUpperCase()} STACK:\n${info.stack}`;
        }),
      ),
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
