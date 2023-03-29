import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "../dev.sqlite3",
    },
  },

  production: {
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
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
