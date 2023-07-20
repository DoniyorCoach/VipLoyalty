import { type ReactNode } from 'react';
import { type SvgIconComponent } from '@mui/icons-material';
import { type VariantType } from 'notistack';

export type IUser = {
	id: string;
	role: 'customer' | 'assistant' | 'manager' | 'admin';
};

export type INavigationPath = {
	label: string;
	icon: SvgIconComponent;
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

export type ICeilComponentProps = {
	left?: ReactNode;
	center?: ReactNode;
	right?: ReactNode;
	flex?: number;
	onClick?: () => void;
};

export type IApplication = {
	id: string;
	name: string;
	text: string;
	user_id?: string;
	user_role?: string;
	business_id?: string;
	isActive: boolean;
	created_at: string;
	updated_at: string;
};

export type IValidatorsProps = {
	email?: string;
	password?: string;
	phoneNumber?: string;
	cardNumber?: string;
	loyaltyName?: string;
	id?: string;
};

export type IValidatorsResponse = {
	email?: boolean;
	password?: boolean;
	phoneNumber?: boolean;
	cardNumber?: boolean;
	loyaltyName?: boolean;
	id?: boolean;
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

export type IChartComponentProps = {
	title: string;
	type: 'line' | 'spline' | 'area' | 'areaspline' | 'column' | 'bar' | 'scatter' | 'pie';
	data: Array<{
		name: string;
		y: number;
	}>;
};

export type IStatisticsForAdmin = {
	customers: number;
	businesses: number;
	businessAssistants: number;
	issuedCards: number;
	activeCards: number;
	blockedCards: number;
	age: Array<{ name: string; y: number }>;
	gender: Array<{ name: string; y: number }>;
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

export type IChat = {
	id: string;
	user_id: string;
	created_at: string;
};

export type IChatListItemComponentProps = {
	chatId: string;
	userId: string;
};

export type IChatListUser = {
	gender: 0 | 1;
	fio: string;
	lastMessage: string;
	unreadMessages: boolean;
};

export type IDeleteAddress = {
	status: number;
	data: string;
};

export type IDeleteAddressProps = {
	id: string;
};

export type IGetApplications = {
	status: number;
	data: IApplication[] | string;
};

export type IGetApplication = {
	status: number;
	data: IApplication | string;
};

export type IGetApplicationProps = {
	id: string;
};

export type ICompleteApplication = {
	status: number;
	data: string;
};

export type ICompleteApplicationProps = {
	id: string;
};

export type IGetChats = {
	status: number;
	data: IChat[] | string;
};

export type IGetChatUser = {
	status: number;
	data: IChatListUser | string | boolean;
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

export type IDeleteIssuedCard = {
	status: number;
	data: string;
};

export type IDeleteIssuedCardProps = {
	cardNumber: number;
};

export type IDeleteLoyalty = {
	status: number;
	data: string;
};

export type IDeleteLoyaltyProps = {
	id: string;
};

export type ICreateManagerAndBusiness = {
	status: number;
	data: string;
};

export type ICreateManagerAndBusinessProps = {
	email: string;
	password: string;
	name: string;
	phoneNumber: string;
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

export type IGetStatisticsForAdmin = {
	status: number;
	data: string | IStatisticsForAdmin;
};

export type ThemeSwitcherProps = {
	lite?: boolean;
};

export type ThemeProviderProps = {
	children: ReactNode;
};
