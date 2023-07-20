import rounding from './rounding';

const calcPoints = (
	amount: number,
	conditions: Record<string, string>,
	points_to_rubles: number,
) => {
	const objectKeys = Object.keys(conditions).sort().reverse();

	for (let i = 0; i < objectKeys.length; i++) {
		if (amount >= Number(objectKeys[i])) {
			return rounding(((amount * Number(conditions[objectKeys[i]])) / 100) * points_to_rubles);
		}
	}
	return 0;
};

export default calcPoints;
