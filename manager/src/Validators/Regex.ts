export const validatePassword = (password: string) => {
	const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;
	return regex.test(password);
};

export const validateLink = (link: string) => {
	const regex = /^(http|https):\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/;
	return regex.test(link);
};

export const validatePercent = (percent: string) => {
	const regex = /^([1-9]|[1-9][0-9]|100)(\.[0-9])?$/;
	return regex.test(percent);
};
