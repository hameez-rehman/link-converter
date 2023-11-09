import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/all-exception-filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.use(json({ limit: '10mb' }));
  // app.use(helmet());
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
  console.log('listening to ', process.env.PORT);
}
bootstrap();
