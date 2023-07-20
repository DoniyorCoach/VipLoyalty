export const validatePassword = (password: string) => {
	const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;
	return regex.test(password);
};

export const validatePercent = (percent: string) => {
	const regex = /^([1-9]|[1-9][0-9]|100)(\.[0-9])?$/;
	return regex.test(percent);
};
