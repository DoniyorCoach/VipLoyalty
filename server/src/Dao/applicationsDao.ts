import db from '../Database/connection';
import { ICompleteApplication, ICreateApplication, IGetApplication } from '../Interfaces';

export const 	createApplication = async ({
	name,
	text,
	user_role,
	user_id,
	business_id,
}: ICreateApplication) => {
	return await db('applications')
		.insert({
			name,
			text,
			user_role,
			user_id,
			business_id,
		})
		.returning('id');
};

export const getApplications = async () => {
	return await db('applications').select('*').where({ deleted: false });
};

export const getApplication = async ({ id }: IGetApplication) => {
	return await db('applications').where({ id }).andWhere({ deleted: false }).select('*')
		.first();
};

export const completeApplication = async ({ id, updated_at }: ICompleteApplication) => {
	return await db('applications')
		.where({ id })
		.andWhere({ deleted: false })
		.update({ isActive: false, updated_at })
		.returning('id');
};
