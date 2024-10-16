import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ManagerExceptionFilter } from '@core/exceptions/manager-exception.filter';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import * as tsConfigPaths from 'tsconfig-paths';
import * as fs from 'fs';
import * as path from 'path';

// Leer el archivo tsconfig.json
const tsConfigPath = path.resolve(__dirname, '../tsconfig.json');
const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf-8'));

// Registrar los paths de tsconfig
tsConfigPaths.register({
  baseUrl: tsConfig.compilerOptions.outDir || './dist', // Ruta de salida de los archivos transpilados
  paths: tsConfig.compilerOptions.paths // Aliases definidos en tsconfig
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Config
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(process.env.contexto);
  app.use(cookieParser()); // Agrega esta línea
  // Excepciones.
  app.useGlobalFilters(new ManagerExceptionFilter());
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Inventory Backend')
    .setDescription('Inventory API description')
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
