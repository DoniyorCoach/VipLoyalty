export const validatePassword = (password: string) => {
	const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;
	return regex.test(password);
};

export const validateLink = (link: string) => {
	const regex = /^(http|https):\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/;
	return regex.test(link);
};
