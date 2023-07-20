import db from '../Database/connection';

export const getCategories = async () => {
	return await db('categories').select('*');
};
