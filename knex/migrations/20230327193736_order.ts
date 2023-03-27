import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("order", (table) => {
    table.increments("id").primary();
    table.timestamp("pay_time");
    table.boolean("is_paid").defaultTo(false);
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
  await knex.schema.dropTable("order");
}
