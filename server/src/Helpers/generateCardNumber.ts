const generateCardNumber = () => {
	const timestamp = Date.now().toString().substring(0, 10);
	const random1 = Math.floor(Math.random() * 100000000000000);
	const random2 = Math.floor(Math.random() * 100000000000000);
	const uniqueNumber = timestamp + random1.toString().substring(0, 3)
	+ random2.toString().substring(0, 3);
	return +uniqueNumber;
};

export default generateCardNumber;
