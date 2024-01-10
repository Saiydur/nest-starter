import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Constants } from './utils/constant.utils';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ServerConfig } from './configs/envs/default';

async function bootstrap() {
  const options = {
    cors: true,
  };
  if (ServerConfig.env === 'production') {
    options['httpsOptions'] = {
      key: ServerConfig.httpsOptions.key,
      cert: ServerConfig.httpsOptions.cert,
    };
  }
  const app = await NestFactory.create(AppModule, options);
  app.setGlobalPrefix(Constants.API);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe());
  console.log('args: ', process.argv);
  console.log('build: ', process.argv.slice(2)[0]);
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
