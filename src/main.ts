import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ManagerExceptionFilter } from '@core/exceptions/manager-exception.filter';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Config
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(process.env.contexto);
  app.use(cookieParser()); // Agrega esta línea
  // Excepciones.
  app.useGlobalFilters(new ManagerExceptionFilter());
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Finances Backend')
    .setDescription('Finances API description')
    .setVersion('1.0')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
