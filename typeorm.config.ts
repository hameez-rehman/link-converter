import path = require('path');
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { allEntities } from './src/database/all-entities';
import { allMigrations } from './src/database/all-migrations';

config();

export default new DataSource({
  type: process.env.TYPEORM_CONNECTION as any,
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: allEntities,
  logging: true,
  migrations: allMigrations,
});
