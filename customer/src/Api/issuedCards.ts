import {
	type IIssueCardProps,
	type IGetIssuedCard,
	type IGetIssuedCards,
	type IIssueCard,
	type IGetIssuedCardProps,
} from 'Interfaces';

import { API } from './API';

export const issueCard = async ({ id }: IIssueCardProps): Promise<IIssueCard> => {
	const response: { data: IIssueCard } = await API.post(
		'/issuedCards',
		{ id },
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
			},
		},
	);
	return response.data;
};

export const getIssuedCards = async (): Promise<IGetIssuedCards> => {
	const response: { data: IGetIssuedCards } = await API.get('/issuedCards', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
		},
	});
	return response.data;
};

export const getIssuedCard = async ({ id }: IGetIssuedCardProps): Promise<IGetIssuedCard> => {
	const response: { data: IGetIssuedCard } = await API.get(`/issuedCards/${id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
		},
	});
	return response.data;
};
