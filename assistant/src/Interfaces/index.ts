import { type ReactNode } from 'react';
import { type SvgIconComponent } from '@mui/icons-material';
import { type VariantType } from 'notistack';

export type IUser = {
	id: string;
	role: 'customer' | 'assistant' | 'manager' | 'admin';
};

export type ITransaction = {
	id: string;
	created_at: string;
	amount: number;
	points?: number;
	card_number?: number;
};

export type INavigationPath = {
	label: string;
	icon: SvgIconComponent;
	path: string;
};

export type INavigationPageProps = {
	navigations: INavigationPath[];
};

export type IValidatorsProps = {
	email?: string;
	password?: string;
	cardNumber?: string;
	amount?: string;
	percent?: string;
	points?: string;
};

export type IValidatorsResponse = {
	email?: boolean;
	password?: boolean;
	cardNumber?: boolean;
	amount?: boolean;
	percent?: boolean;
	points?: boolean;
};

export type IPasswordFieldComponentProps = {
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

export type IGetAvailableBonusToWithdraw = {
	status: number;
	data: string | { payableAmount: number; points: number };
};

export type IGetAvailableBonusToWithdrawProps = {
	cardNumber: number;
	amount: number;
};

export type ICreateTransaction = {
	status: number;
	data: string;
};

export type ICreateTransactionProps = {
	amount: number;
	points: number;
	cardNumber: number;
};

export type IGetTransactionsByAssistant = {
	status: number;
	data: string | { transactions: ITransaction[]; totalPages: number };
};

export type IGetTransactionsByAssistantProps = {
	page: number;
};

export type ThemeSwitcherProps = {
	lite?: boolean;
};
