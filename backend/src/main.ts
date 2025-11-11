import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //validação dos dtos
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors(); //permisao de utilizar o postman
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();