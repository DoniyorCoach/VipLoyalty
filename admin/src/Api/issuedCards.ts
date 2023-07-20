import { type IDeleteIssuedCard, type IDeleteIssuedCardProps } from 'Interfaces';

import { API } from './API';

export const deleteIssuedCard = async ({
	cardNumber,
}: IDeleteIssuedCardProps): Promise<IDeleteIssuedCard> => {
	const response: { data: IDeleteIssuedCard } = await API.delete('/issuedCards', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
		},
		data: {
			cardNumber,
		},
	});
	return response.data;
};
