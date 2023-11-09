import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConverterModule } from './converter/converter.module';
import { OopConverterModule } from './oop-converter/oop-converter.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { allEntities } from './database/all-entities';
import { allMigrations } from './database/all-migrations';
import { RequestResponseModule } from './request-response/request-response.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION as any,
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: allEntities, // we can use path resolver here as well
      migrations: allMigrations, // we can use path resolver here as well
      synchronize: false,
    }),
    // Uses Parser Class with schema to parse all web and deep links.
    ConverterModule,
    // Uses Parser Class with inheritance and Inversion Control to parse all web and deep links.
    OopConverterModule,
    // Module to query Request response entity
    RequestResponseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
