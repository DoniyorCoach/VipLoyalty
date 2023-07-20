const groupByProperty = <T>(array: T[], property: keyof T): Record<string, T[]> => {
	const groupedArray: Record<string, T[]> = {};

	array.forEach((item) => {
		const propertyValue = item[property];

		if (Object.prototype.hasOwnProperty.call(groupedArray, String(propertyValue))) {
			groupedArray[String(propertyValue)].push(item);
		} else {
			groupedArray[String(propertyValue)] = [item];
		}
	});

	return groupedArray;
};

export default groupByProperty;
