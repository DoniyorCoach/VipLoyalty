import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
	await knex('categories').del();

	await knex('categories').insert([
		{ name: 'Продукты питания' },
		{ name: 'Кафе и рестораны' },
		{ name: 'Электроника' },
		{ name: 'Авто' },
		{ name: 'Спортивные товары' },
		{ name: 'Ювелирные украшения' },
		{ name: 'Страхование' },
		{ name: 'Здоровье' },
		{ name: 'Развлечение' },
		{ name: 'Обувь и аксессуары' },
		{ name: 'Одежда' },
		{ name: 'Красота' },
		{ name: 'Для дома' },
	]);
}
