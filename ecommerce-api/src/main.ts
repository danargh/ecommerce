import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
   // use nest with express
   const app = await NestFactory.create<NestExpressApplication>(AppModule);

   // trust request from the loopback address
   app.set('trust proxy', 'loopback');

   // cors enable
   app.enableCors();

   // swagger api documentation
   const options = new DocumentBuilder()
      .setTitle('Api Documentation Ecommerce Platform')
      .setDescription(
         'Api documentation for ecommerce platform technical test in PT Ganapatih Akasa Solution ',
      )
      .setVersion('0.1.0')
      .addBearerAuth()
      .build();
   const document = SwaggerModule.createDocument(app, options);
   SwaggerModule.setup('/', app, document);

   // request validation
   app.useGlobalPipes(
      new ValidationPipe({
         whitelist: true,
         forbidNonWhitelisted: true,
         transform: true,
      }),
   );

   // request ip

   // helmet middleware
   app.use(helmet());

   // logger middleware
   const logger = new Logger();
   app.useLogger(logger);

   // exception filter
   // app.useGlobalFilters()

   // server listening
   const port = process.env.PORT ?? 3000;
   await app.listen(port).then(() => {
      logger.log(`Server listening on port : ${port}`, 'Botstrap');
   });
}
bootstrap();
