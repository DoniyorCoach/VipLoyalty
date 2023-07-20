import { getIssuedCardByCardNumber } from '../Dao/issuedCardsDao';
import { getLoyaltyByAssistantId } from '../Dao/loyaltiesDao';
import rounding from '../Helpers/rounding';

const getAvailableBonusToWithdrawService = async (
	cardNumber: number,
	amount: number,
	assistant_id: string,
) => {
	const card = await getIssuedCardByCardNumber({ card_number: cardNumber });
	if (!card) {
		return { status: 404, data: 'Данная карта пользователя не существует' };
	}

	const { id, payment_percent, points_to_rubles } = await getLoyaltyByAssistantId({
		id: assistant_id,
	});
	if (card.loyalty_id !== id) {
		return {
			status: 403,
			data: 'Данный пользователь не является вашим клиентом',
		};
	}

	const availableBonus = {
		points: 0,
		payableAmount: 0,
	};

	if (card.balance > amount * (payment_percent / 100)) {
		availableBonus.points = rounding(amount * (payment_percent / 100));
		availableBonus.payableAmount = rounding(amount - availableBonus.points / points_to_rubles);
	} else {
		availableBonus.points = card.balance;
		availableBonus.payableAmount = rounding(amount - card.balance / points_to_rubles);
	}

	return { status: 200, data: availableBonus };
};

export default getAvailableBonusToWithdrawService;
