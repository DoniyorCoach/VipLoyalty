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

export type IProgram = {
	id: string;
	name: string;
	description: string;
	image: string;
	category: string;
	conditions: Record<string, string>;
	payment_percent: string;
	points_to_rubles: string;
	created_at: string;
	updated_at: string;
};

export type IUpdateProgramPageProps = {
	program: IProgram;
	categories: ICategory[];
	setProgram: (program: IProgram) => void;
};

export type IAddress = {
	id: string;
	name: string;
};

export type ICategory = {
	id: string;
	name: string;
};

export type IUpdateAddressPageProps = {
	selectedAddress: IAddress;
	reloadPage: boolean;
	setReloadPage: (value: boolean) => void;
};

export type IAssistant = {
	id: string;
	fio: string;
	email: string;
	password?: string;
	work_address: string;
	work_address_id: string;
};

export type IUpdateAssistantPageProps = {
	selectedAssistant: IAssistant;
	reloadPage: boolean;
	setReloadPage: (value: boolean) => void;
};

export type ICeilComponentProps = {
	left?: ReactNode;
	center?: ReactNode;
	right?: ReactNode;
	flex?: number;
	onClick?: () => void;
};

export type IValidatorsProps = {
	email?: string;
	password?: string;
	secondPassword?: string;
	name?: string;
	amount?: string;
	address?: string;
	fio?: string;
	loyaltyName?: string;
	file?: File | undefined;
	id?: string;
	link?: string;
	category?: string;
	percent?: string;
	points?: string;
};

export type IValidatorsResponse = {
	email?: boolean;
	password?: boolean;
	secondPassword?: boolean;
	name?: boolean;
	amount?: boolean;
	address?: boolean;
	fio?: boolean;
	loyaltyName?: boolean;
	file?: boolean;
	id?: boolean;
	link?: boolean;
	category?: boolean;
	percent?: boolean;
	points?: boolean;
};

export type IAddAssistantPageProps = {
	reloadPage: boolean;
	setReloadPage: (value: boolean) => void;
};

export type IUploaderComponent = {
	link: string;
	setLink: (link: string) => void;
};

export type ICreateProgramPageProps = {
	setReloadPage: (reloadPage: boolean) => void;
	categories: ICategory[];
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

export type IProgramConditionComponentProps = {
	persent: string;
	setPersent: (value: string) => void;
	amount: string;
	setAmount: (value: string) => void;
	firstLabel?: string;
	secondLabel?: string;
	firstAvatar?: ReactNode;
	secondAvatar?: ReactNode;
	firstErrorText?: string;
	secondErrorText?: string;
	persentError: boolean | undefined;
	amountError: boolean | undefined;
};

export type IProgramSettingsPageProps = {
	conditions?: Record<string, string>;
	paymentPercent?: string;
	pointsToRubles?: string;

	setSettingsValidate: (value: boolean) => void;
	setConditions: (conditions: Record<string, string>) => void;
	setPaymentPercent: (parcent: string) => void;
	setPointsToRubles: (points: string) => void;
};

export type IChartComponentProps = {
	title: string;
	type: 'line' | 'spline' | 'area' | 'areaspline' | 'column' | 'bar' | 'scatter' | 'pie';
	data: Array<{
		name: string;
		y: number;
	}>;
};

export type IStatisticsForManager = {
	issuedCards: number;
	activeCards: number;
	blockedCards: number;
	pointsBalance: number;
	storesCount: number;
	assistantsCount: number;
	age: Array<{ name: string; y: number }>;
	gender: Array<{ name: string; y: number }>;
};

export type IGetAddresses = {
	status: number;
	data: { addresses: IAddress[]; totalPages: number } | IAddress[] | string;
};

export type IGetAddressesProps = {
	page?: number;
};

export type ICreateAddress = {
	status: number;
	data: string;
};

export type ICreateAddressProps = {
	name: string;
};

export type IUpdateAddress = {
	status: number;
	data: string;
};

export type IUpdateAddressProps = {
	id: string;
	name: string;
};

export type ICreateApplication = {
	status: number;
	data: string;
};

export type ICreateApplicationProps = {
	name: string;
	text: string;
	user_role: string;
};

export type IGetAssistants = {
	status: number;
	data: { assistants: IAssistant[]; totalPages: number } | string;
};

export type IGetAssistantsProps = {
	page: number;
};

export type ICreateAssistant = {
	status: number;
	data: string;
};

export type ICreateAssistantProps = {
	fio: string;
	addressId: string;
	email: string;
	password: string;
};

export type IUpdateAssistant = {
	status: number;
	data: string;
};

export type IUpdateAssistantProps = {
	fio: string;
	addressId: string;
	password: string;
	email: string;
};

export type IDeleteAssistant = {
	status: number;
	data: string;
};

export type IDeleteAssistantProps = {
	id: string;
};

export type IGetCategories = {
	status: number;
	data: ICategory[] | string;
};

export type IUploadPhoto = {
	data: { url: string };
};

export type IUploadPhotoProps = {
	image: File;
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

export type ICreateLoyaltyProgram = {
	status: number;
	data: string;
};

export type ICreateLoyaltyProgramProps = {
	name: string;
	category: string;
	description: string;
	image: string;
	conditions: Record<string, string>;
	paymentPercent: number;
	pointsToRubles: number;
};

export type IUpdateLoyaltyProgram = {
	status: number;
	data: string | IProgram;
};

export type IUpdateLoyaltyProgramProps = {
	name: string;
	category: string;
	description: string;
	image: string;
	conditions: Record<string, string>;
	paymentPercent: number;
	pointsToRubles: number;
};

export type IGetLoyaltyProgram = {
	status: number;
	data: string | IProgram;
};

export type IUpdatePassword = {
	status: number;
	data: string;
};

export type IUpdatePasswordProps = {
	currentPassword: string;
	changedPassword: string;
};

export type IGetStatisticsForManager = {
	status: number;
	data: string | IStatisticsForManager;
};

export type ThemeSwitcherProps = {
	lite?: boolean;
};
