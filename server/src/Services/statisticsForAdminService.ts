import {
	getAgeCategoriesStatistics,
	getBusinessesAssistantsStatistics,
	getBusinessesStatistics,
	getCustomersStatistics,
	getGenderStatistics,
	getIssuedCardStatistics,
} from '../Dao/statisticsDao';
import { IStatisticsForAdmin } from '../Interfaces';

export const statisticsForAdminService = async () => {
	const statistics: IStatisticsForAdmin = {
		customers: (await getCustomersStatistics()).length,
		businesses: (await getBusinessesStatistics()).length,
		businessAssistants: (await getBusinessesAssistantsStatistics()).length,
		activeCards: (await getIssuedCardStatistics({ active: true })).length,
		issuedCards: (await getIssuedCardStatistics({})).length,
		blockedCards: (await getIssuedCardStatistics({ deleted: true })).length,
		age: [
			{
				name: 'От 14 до 20',
				y: (await getAgeCategoriesStatistics({ minAge: 14, maxAge: 20 })).length,
			},
			{
				name: 'От 20 до 25',
				y: (await getAgeCategoriesStatistics({ minAge: 20, maxAge: 25 })).length,
			},
			{
				name: 'От 25 до 35',
				y: (await getAgeCategoriesStatistics({ minAge: 25, maxAge: 35 })).length,
			},
			{
				name: 'От 35 до 50',
				y: (await getAgeCategoriesStatistics({ minAge: 35, maxAge: 50 })).length,
			},
			{
				name: 'От 50 до 65',
				y: (await getAgeCategoriesStatistics({ minAge: 50, maxAge: 65 })).length,
			},
			{
				name: 'От 65',
				y: (await getAgeCategoriesStatistics({ minAge: 65 })).length,
			},
		],
		gender: [
			{
				name: 'Мужской',
				y: (await getGenderStatistics({ gender: 0 })).length,
			},
			{
				name: 'Женский',
				y: (await getGenderStatistics({ gender: 1 })).length,
			},
		],
	};

	return { status: 200, data: statistics };
};
