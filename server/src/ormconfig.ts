import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const ormconfig: DataSourceOptions = {
  type: 'postgres',
  host:
    process.env.NODE_ENV === 'migration' || process.env.NODE_ENV === 'test'
      ? 'localhost'
      : process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  migrations: [
    `${__dirname}/shared/infra/database/typeorm/migrations/**/*{.ts,.js}`,
  ],
};

const dataSource = new DataSource(ormconfig);
export default dataSource;
