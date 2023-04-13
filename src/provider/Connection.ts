import Knex from "knex";
import * as dotenv from "dotenv";
dotenv.config();

const environmentTest = Knex({
  client: process.env.DATABASE_CLIENT,
  connection: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    database: "development",
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
  pool: {
    min: Number(process.env.DATABASE_POOL_MIN),
    max: Number(process.env.DATABASE_POOL_MAX),
  },
  acquireConnectionTimeout: 2000,
});

const postgresClient = Knex({
  client: process.env.DATABASE_CLIENT,
  connection: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
  pool: {
    min: Number(process.env.DATABASE_POOL_MIN),
    max: Number(process.env.DATABASE_POOL_MAX),
  },
  acquireConnectionTimeout: 2000,
});

const baseDefault = Number(process.env.DEBUG)
  ? environmentTest
  : postgresClient;

export const Connection = {
  getDefault(): ReturnType<typeof Knex> {
    return baseDefault;
  },
  getEnvironmentTest(): ReturnType<typeof Knex> {
    return environmentTest;
  },

  getProductionEnvironment(): ReturnType<typeof Knex> {
    return postgresClient;
  },
};
