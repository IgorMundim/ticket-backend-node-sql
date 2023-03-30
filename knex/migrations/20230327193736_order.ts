import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("order", (table) => {
    table.increments("id").primary();
    table.timestamp("pay_time");
    table.boolean("is_paid").defaultTo(false);
    table.integer("installment");
    table.enu("type_of_payment", ["credit", "pix"]);
    table.integer("account_id").unsigned();
    table
      .foreign("account_id")
      .references("account.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.timestamps(true, true);
  });
  await knex.schema.createTable("ticket", (table) => {
    table.increments("id").primary();
    table.decimal("price", 8, 2);
    table.decimal("sale_price", 8, 2);
    table.string("code");
    table.boolean("is_student");
    table.boolean("is_active").defaultTo(false);
    table.integer("units");
    table.integer("event_id").unsigned();
    table.foreign("event_id").references("event.id");
    table.integer("leasing_id").unsigned().notNullable();
    table.foreign("leasing_id").references("leasing.id");
    table.integer("order_id").unsigned();
    table.foreign("order_id").references("order.id");
    table.timestamp("date_joined");
    table.timestamps(true, true);
  });
  await knex.schema.createTable("card", (table) => {
    table.increments("id").primary();
    table.integer("installment");
    table.enu("type_of_payment", ["credit", "pix"]);
    table.integer("ticket_id").unsigned();
    table.foreign("ticket_id").references("ticket.id");
    table.integer("account_id").unsigned();
    table
      .foreign("account_id")
      .references("account.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("event_address");
  await knex.schema.dropTable("event_category");
  await knex.schema.dropTable("category");
  await knex.schema.dropTable("image");
  await knex.schema.dropTable("batch");
  await knex.schema.dropTable("address");
  await knex.schema.dropTable("card");
  await knex.schema.dropTable("ticket");
  await knex.schema.dropTable("order");
  await knex.schema.dropTable("account");
  await knex.schema.dropTable("leasing");
  await knex.schema.dropTable("event");
}
