import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { AppExceptionFilter } from './shared/exceptions/app-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.useGlobalFilters(new AppExceptionFilter());
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log('Application is running on: ' + await app.getUrl());
}
bootstrap();
