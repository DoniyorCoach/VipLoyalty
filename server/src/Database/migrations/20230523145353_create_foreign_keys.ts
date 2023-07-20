import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('managers', (table) => {
		table.foreign('business_id').references('businesses.id');
	});
	await knex.schema.alterTable('businesses', (table) => {
		table.foreign('manager_id').references('managers.id');
	});
	await knex.schema.alterTable('loyalties', (table) => {
		table.foreign('business_id').references('businesses.id');
		table.foreign('category').references('categories.name');
	});
	await knex.schema.alterTable('addresses', (table) => {
		table.foreign('business_id').references('businesses.id');
	});
	await knex.schema.alterTable('assistants', (table) => {
		table.foreign('work_address_id').references('addresses.id');
		table.foreign('business_id').references('businesses.id');
	});
	await knex.schema.alterTable('issued_cards', (table) => {
		table.foreign('loyalty_id').references('loyalties.id');
		table.foreign('owner_id').references('customers.id');
	});
	await knex.schema.alterTable('transactions', (table) => {
		table.foreign('card_number').references('issued_cards.card_number');
		table.foreign('assistant_id').references('assistants.id');
	});
	await knex.schema.alterTable('applications', (table) => {
		table.foreign('business_id').references('businesses.id');
	});
	await knex.schema.alterTable('messages', (table) => {
		table.foreign('chat_id').references('chats.id');
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('managers', (table) => {
		table.dropForeign(['business_id']);
	});
	await knex.schema.alterTable('businesses', (table) => {
		table.dropForeign(['manager_id']);
	});
	await knex.schema.alterTable('loyalties', (table) => {
		table.dropForeign(['business_id']);
		table.dropForeign(['category']);
	});
	await knex.schema.alterTable('addresses', (table) => {
		table.dropForeign(['business_id']);
	});
	await knex.schema.alterTable('assistants', (table) => {
		table.dropForeign(['work_address_id']);
		table.dropForeign(['business_id']);
	});
	await knex.schema.alterTable('issued_cards', (table) => {
		table.dropForeign(['loyalty_id']);
		table.dropForeign(['owner_id']);
	});
	await knex.schema.alterTable('transactions', (table) => {
		table.dropForeign(['card_number']);
		table.dropForeign(['assistant_id']);
	});
	await knex.schema.alterTable('applications', (table) => {
		table.dropForeign(['business_id']);
	});
	await knex.schema.alterTable('messages', (table) => {
		table.dropForeign(['chat_id']);
	});
}
