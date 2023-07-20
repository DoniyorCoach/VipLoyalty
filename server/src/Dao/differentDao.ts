import db from '../Database/connection';
import { IGetBusinessIdByAssistantId, IGetBusinessIdByManagerId } from '../Interfaces';

export const getBusinessIdByManagerId = async ({ id }: IGetBusinessIdByManagerId) => {
	return await db('managers')
		.where({ id })
		.andWhere({ deleted: false })
		.select('business_id')
		.first();
};

export const getBusinessIdByAssistantId = async ({ id }: IGetBusinessIdByAssistantId) => {
	return await db('assistants')
		.where({ id })
		.andWhere({ deleted: false })
		.select('business_id')
		.first();
};
