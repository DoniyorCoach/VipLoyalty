import { type ReactNode } from 'react';
import { type VariantType } from 'notistack';

export type IUser = {
	id: string;
	role: 'customer' | 'assistant' | 'manager' | 'admin';
};

export type IIssuedCard = {
	id: string;
	card_number?: number;
	qrcode?: string;
	image: string;
	balance?: number;
	name?: string;
};

export type ICatalogCard = {
	id: string;
	name: string;
	description: string;
	image: string;
	category: string;
};

export type ICatalogCards = Record<string, ICatalogCard[]>;

export type ICarouselComponentProps = {
	cards: ICatalogCard[];
};

export type ITransaction = {
	id: string;
	created_at: string;
	amount: number;
	points?: number;
	card_number?: number;
};

export type ITransactionsPageProps = {
	cardNumber: number;
};

export type INavigationPath = {
	label: string;
	icon: ReactNode;
	path: string;
};

export type INavigationPageProps = {
	navigations: INavigationPath[];
};

export type IModalComponentProps = {
	open: boolean;
	onClose: (status: boolean) => void;
	children: ReactNode;
};

export type ICategory = {
	id: string;
	name: string;
};

export type IValidatorsProps = {
	email?: string;
	password?: string;
	age?: number;
	phoneNumber?: string;
	name?: string;
	fio?: string;
};

export type IValidatorsResponse = {
	email?: boolean;
	password?: boolean;
	age?: boolean;
	phoneNumber?: boolean;
	name?: boolean;
	fio?: boolean;
};

export type IPasswordFieldPageProps = {
	variant: 'outlined' | 'standard' | 'filled';
	label?: string;
	size?: 'medium' | 'small';
	password: string;
	setPassword: (value: string) => void;
	error: boolean | undefined;
};

export type IEmailFieldComponentProps = {
	variant: 'outlined' | 'standard' | 'filled';
	label?: string;
	size?: 'medium' | 'small';
	email: string;
	setEmail?: (value: string) => void;
	error: boolean | undefined;
	disabled?: true;
};

export type ISnackbar = {
	text: string;
	variant: VariantType;
};

export type ISnackbarComponentProps = {
	setText: (value: undefined) => void;
} & ISnackbar;

export type ThemeProviderProps = {
	children: ReactNode;
};

export type IMessageComponentProps = {
	text: string;
	date: string;
	owner?: boolean;
	admin?: boolean;
};

export type IMessage = {
	id: string;
	text: string;
	sender_id: string;
	chat_id: string;
	is_read: boolean;
	created_at: string;
};

// API INTERFACES

export type ICreateB2bApplication = {
	status: number;
	data: string;
};

export type ICreateB2bApplicationProps = {
	name: string;
	text: string;
	user_role: string;
};

export type IGetCategories = {
	status: number;
	data: ICategory[] | string;
};

export type IGetChatUser = {
	status: number;
	data: string | boolean;
};

export type IGetChatUserProps = {
	userId?: string;
	chatId?: string;
};

export type IAuthentication = {
	status: number;
	data: { token: string; user: IUser };
};

export type IAuthorization = {
	status: number;
	data: { token: string; user: IUser } | string;
};

export type IAuthorizationProps = {
	email: string;
	password: string;
	role: 'customer' | 'assistant' | 'manager' | 'admin' | 'anonym';
};

export type IRegistration = {
	status: number;
	data: { token: string; user: IUser } | string;
};

export type IRegistrationProps = {
	email: string;
	password: string;
	age: number;
	gender: number;
	fio: string;
};

export type IGetCustomer = {
	status: number;
	data: { age: number; gender: number; fio: string } | string;
};

export type IUpdateCustomer = {
	status: number;
	data: string;
};

export type IUpdateCustomerProps = {
	age: number;
	gender: number;
	fio: string;
};

export type IIssueCard = {
	status: number;
	data: string | { id: string };
};

export type IIssueCardProps = {
	id: string;
};

export type IGetIssuedCards = {
	status: number;
	data: string | IIssuedCard[];
};

export type IGetIssuedCard = {
	status: number;
	data: IIssuedCard;
};

export type IGetIssuedCardProps = {
	id: string;
};

export type IGetLoyalties = {
	status: number;
	data: ICatalogCards | string;
};

export type IGetLoyaltyRecommendations = {
	status: number;
	data: ICatalogCard[] | string;
};

export type IGetLoyaltyRecommendationsProps = {
	id: string;
};

export type IGetLoyalty = {
	status: number;
	data: ICatalogCard;
};

export type IGetLoyaltyProps = {
	id: string;
};

export type IGetMessages = {
	status: number;
	data: string | IMessage[];
};

export type IGetMessagesProps = {
	chat_id?: string;
};

export type ICreateMessage = {
	status: number;
	data: string;
};

export type ICreateMessageProps = {
	text: string;
	chat_id?: string;
};

export type ISetMessagesRead = {
	status: number;
	data: string;
};

export type ISetMessagesReadProps = {
	chat_Id?: string;
};

export type IGetTransactionsByCardNumber = {
	status: number;
	data: string | { transactions: ITransaction[]; totalPages: number };
};

export type IGetTransactionsByCardNumberProps = {
	cardNumber: number;
	page: number;
};
