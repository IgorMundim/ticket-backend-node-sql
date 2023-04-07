import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("category", (table) => {
    table.increments("id").primary();
    table.string("name", 100).notNullable().unique();
    table.boolean("is_active").defaultTo(true);
    table.string("url", 200).notNullable();
    table.string("alt_text", 200).notNullable();
    table.timestamps(true, true);
  });
  await knex.schema.createTable("event", (table) => {
    table.increments("id").primary();
    table.string("name", 100).notNullable();
    table.boolean("in_room").defaultTo(true);
    table.timestamp("date_end").notNullable();
    table.timestamp("date_start").notNullable();
    table.string("description");
    table.boolean("is_virtual").defaultTo(false);
    table.string("video_url", 200);
    table.boolean("is_published").defaultTo(true);
    table.timestamps(true, true);
  });

  await knex.schema.createTable("event_address", (table) => {
    table.increments("id").primary();
    table.string("telephone", 20);
    table.string("postal_code", 10);
    table.string("complement", 150);
    table.string("city", 100);
    table.string("neighborhood", 100);
    table.string("number", 15);
    table.string("street", 100);
    table.string("uf", 2);
    table.integer("event_id").unique().unsigned();
    table
      .foreign("event_id")
      .references("event.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.timestamps(true, true);
  });

  await knex.schema.createTable("image", (table) => {
    table.increments("id").primary();
    table.string("url").notNullable();
    table.string("alt_text", 200).notNullable();
    table.integer("event_id").unsigned().notNullable();
    table
      .foreign("event_id")
      .references("event.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.timestamps(true, true);
  });
  await knex.schema.createTable("event_category", (table) => {
    table.integer("event_id").unsigned();
    table.foreign("event_id").references("category.id");
    table.integer("category_id").unsigned();
    table.foreign("category_id").references("event.id");
    table.primary(["event_id", "category_id"]);
  });
  await knex.schema.createTable("batch", (table) => {
    table.increments("id").primary();

    table.decimal("percentage", 5, 2);
    table.integer("sales_qtd");
    table.timestamp("batch_stop_date");
    table.string("description", 150);
    table.boolean("is_active").defaultTo(true);
    table.integer("event_id").unsigned().notNullable();
    table
      .foreign("event_id")
      .references("event.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.timestamps(true, true);
  });
  await knex.schema.createTable("leasing", (table) => {
    table.increments("id").primary();
    table.string("name", 100);
    table.string("description", 150);
    table.boolean("is_active").defaultTo(true);
    table.decimal("store_price", 8, 2);
    table.decimal("sale_price", 8, 2);
    table.decimal("student_price", 8, 2);
    table.integer("units_solid");
    table.integer("units");
    table.integer("event_id").unsigned().notNullable();
    table
      .foreign("event_id")
      .references("event.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.timestamps(true, true);
  });

}

export async function down(knex: Knex): Promise<void> {

  //
}
