import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ErrorMiddleware } from '@common/middlewares/error.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(new ErrorMiddleware().use);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
