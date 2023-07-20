import {
	getAddressesByBusinessId,
	getAgeCategoriesByLoyaltyId,
	getAssistantsByBusinessId,
	getIssuedCardByLoyaltyId,
	getGenderByLoyaltyId,
} from '../Dao/statisticsDao';
import { IStatisticsForManager } from '../Interfaces';

export const statisticsForManagerService = async (loyaltyId: string, businessId: string) => {
	const statistics: IStatisticsForManager = {
		issuedCards: (await getIssuedCardByLoyaltyId({ loyalty_id: loyaltyId })).length,
		blockedCards: (await getIssuedCardByLoyaltyId({ loyalty_id: loyaltyId, deleted: true })).length,
		activeCards: (await getIssuedCardByLoyaltyId({ loyalty_id: loyaltyId, active: true })).length,
		pointsBalance: (await getIssuedCardByLoyaltyId({ loyalty_id: loyaltyId, points: true }))[0].sum,
		storesCount: (await getAddressesByBusinessId({ business_id: businessId })).length,
		assistantsCount: (await getAssistantsByBusinessId({ business_id: businessId })).length,
		age: [
			{
				name: 'От 14 до 20',
				y: (await getAgeCategoriesByLoyaltyId({ loyalty_id: loyaltyId, minAge: 14, maxAge: 20 }))
					.length,
			},
			{
				name: 'От 20 до 25',
				y: (await getAgeCategoriesByLoyaltyId({ loyalty_id: loyaltyId, minAge: 20, maxAge: 25 }))
					.length,
			},
			{
				name: 'От 25 до 35',
				y: (await getAgeCategoriesByLoyaltyId({ loyalty_id: loyaltyId, minAge: 25, maxAge: 35 }))
					.length,
			},
			{
				name: 'От 35 до 50',
				y: (await getAgeCategoriesByLoyaltyId({ loyalty_id: loyaltyId, minAge: 35, maxAge: 50 }))
					.length,
			},
			{
				name: 'От 50 до 65',
				y: (await getAgeCategoriesByLoyaltyId({ loyalty_id: loyaltyId, minAge: 50, maxAge: 65 }))
					.length,
			},
			{
				name: 'От 65',
				y: (await getAgeCategoriesByLoyaltyId({ loyalty_id: loyaltyId, minAge: 65 })).length,
			},
		],
		gender: [
			{
				name: 'Мужской',
				y: (await getGenderByLoyaltyId({ loyalty_id: loyaltyId, gender: 0 })).length,
			},
			{
				name: 'Женский',
				y: (await getGenderByLoyaltyId({ loyalty_id: loyaltyId, gender: 1 })).length,
			},
		],
	};

	if (statistics.issuedCards < 10 || (statistics.gender[0].y < 5 && statistics.gender[1].y < 5)) {
		return {
			status: 102,
			data: 'Недостаточно информации для отображения статистики',
		};
	}

	return { status: 200, data: statistics };
};
