import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema
		.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
		.createTable('managers', (table) => {
			table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
			table.uuid('business_id');
			table.boolean('deleted').defaultTo(false);
			table.timestamp('created_at').defaultTo(knex.fn.now());
		})
		.createTable('accounts', (table) => {
			table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
			table.string('email').unique().notNullable();
			table.string('password').notNullable();
			table.uuid('user_id').unique().notNullable();
			table.string('role').notNullable().checkIn(['customer', 'assistant', 'manager', 'admin']);
			table.boolean('deleted').defaultTo(false);
			table.timestamp('created_at').defaultTo(knex.fn.now());
		})
		.createTable('businesses', (table) => {
			table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
			table.string('name').notNullable();
			table.string('phone_number').notNullable();
			table.uuid('manager_id').notNullable();
			table.boolean('deleted').defaultTo(false);
			table.timestamp('created_at').defaultTo(knex.fn.now());
		})
		.createTable('loyalties', (table) => {
			table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
			table.string('name').notNullable();
			table.text('description').notNullable();
			table.string('image').notNullable();
			table.string('category').notNullable();
			table.jsonb('conditions').notNullable();
			table.integer('payment_percent').notNullable();
			table.integer('points_to_rubles').notNullable();
			table.uuid('business_id').notNullable();
			table.boolean('deleted').defaultTo(false);
			table.timestamps(true, true);
		})
		.createTable('addresses', (table) => {
			table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
			table.string('name').notNullable();
			table.uuid('business_id').notNullable();
			table.boolean('deleted').defaultTo(false);
			table.timestamp('created_at').defaultTo(knex.fn.now());
		})
		.createTable('assistants', (table) => {
			table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
			table.string('fio').notNullable();
			table.uuid('work_address_id').notNullable();
			table.uuid('business_id').notNullable();
			table.boolean('deleted').defaultTo(false);
			table.timestamp('created_at').defaultTo(knex.fn.now());
		})
		.createTable('customers', (table) => {
			table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
			table.string('fio').notNullable();
			table.integer('age').notNullable();
			table.integer('gender').notNullable();
			table.boolean('deleted').defaultTo(false);
			table.timestamp('created_at').defaultTo(knex.fn.now());
		})
		.createTable('issued_cards', (table) => {
			table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
			table.bigint('card_number').notNullable().unique();
			table.float('balance').defaultTo(0);
			table.uuid('loyalty_id').notNullable();
			table.uuid('owner_id').notNullable();
			table.text('qrcode').notNullable();
			table.boolean('deleted').defaultTo(false);
			table.timestamp('created_at').defaultTo(knex.fn.now());
		})
		.createTable('transactions', (table) => {
			table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
			table.float('amount').notNullable();
			table.float('points').notNullable();
			table.bigint('card_number').notNullable();
			table.uuid('assistant_id').notNullable();
			table.timestamp('created_at').defaultTo(knex.fn.now());
		})
		.createTable('applications', (table) => {
			table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
			table.string('name').notNullable();
			table.text('text').notNullable();
			table.uuid('user_id');
			table
				.string('user_role')
				.notNullable()
				.checkIn(['customer', 'assistant', 'manager', 'anonym']);
			table.uuid('business_id');
			table.boolean('isActive').defaultTo(true);
			table.boolean('deleted').defaultTo(false);
			table.timestamps(true, true);
		})
		.createTable('admins', (table) => {
			table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
			table.boolean('deleted').defaultTo(false);
			table.timestamp('created_at').defaultTo(knex.fn.now());
		})
		.createTable('categories', (table) => {
			table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
			table.string('name').unique().notNullable();
		})
		.createTable('chats', (table) => {
			table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
			table.uuid('user_id').notNullable();
		})
		.createTable('messages', (table) => {
			table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
			table.text('text').notNullable();
			table.uuid('sender_id').notNullable();
			table.uuid('chat_id').notNullable();
			table.boolean('is_read').defaultTo(false);
			table.timestamp('created_at').defaultTo(knex.fn.now());
		});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('managers');
	await knex.schema.dropTable('accounts');
	await knex.schema.dropTable('businesses');
	await knex.schema.dropTable('loyalties');
	await knex.schema.dropTable('addresses');
	await knex.schema.dropTable('assistants');
	await knex.schema.dropTable('customers');
	await knex.schema.dropTable('issued_cards');
	await knex.schema.dropTable('transactions');
	await knex.schema.dropTable('applications');
	await knex.schema.dropTable('admins');
	await knex.schema.dropTable('categories');
	await knex.schema.dropTable('chats');
	await knex.schema.dropTable('messages');
	await knex.schema.raw('DROP EXTENSION IF EXISTS "uuid-ossp"');
}
