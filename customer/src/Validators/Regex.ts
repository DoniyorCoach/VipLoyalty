export const validatePassword = (password: string) => {
	const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;
	return regex.test(password);
};
