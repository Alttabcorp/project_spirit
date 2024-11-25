import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { config } from 'dotenv';
import * as session from 'express-session';


config();
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);


  app.useGlobalPipes(new ValidationPipe());


   // Configurações do Handlebars
   app.useStaticAssets(join(__dirname, '..', 'public'));
   app.setBaseViewsDir(join(__dirname, '..', 'views'));
   app.setViewEngine('hbs');


  app.use(
    session({
      secret: process.env.SESSION_SECRET ||'default_secret_key',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: process.env.NODE_ENV === 'production' },
    }),
  );

  await app.listen(3000);
}
bootstrap();
