import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("account", (table) => {
    table.increments("id").primary();
    table.string("email", 60).unique().notNullable();
    table.string("password", 60).notNullable();
    table.timestamp("last_login");
    table.string("first_name", 60);
    table.string("last_name", 60);
    table.boolean("is_superuser").defaultTo(false);
    table.boolean("is_admin").defaultTo(false);
    table.boolean("is_active").defaultTo(true);
    table.timestamps(true, true);
  });
  await knex.schema.createTable("refresh_token", (table) => {
    table.increments("id").primary();
    table.string("token");
    table.integer("expire_in");
    table.integer("account_id").unique().unsigned();
    table
      .foreign("account_id")
      .references("account.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
  await knex.schema.createTable("address", (table) => {
    table.increments("id").primary();
    table.string("cpf", 15);
    table.string("telephone", 20);
    table.string("postal_code", 10);
    table.string("complement", 150);
    table.string("city", 100);
    table.string("neighborhood", 100);
    table.string("number", 15);
    table.string("street", 100);
    table.string("uf", 2);
    table.integer("account_id").unsigned().notNullable();
    table
      .foreign("account_id")
      .references("account.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  //
}
