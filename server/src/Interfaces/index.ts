import { Request } from 'express';
import { IRole } from '../Types';

export interface IValidatorsProps {
	email?: string;
	password?: string;
	secondPassword?: string;
	age?: number;
	phoneNumber?: string;
	name?: string;
	cardNumber?: number;
	amount?: number;
	address?: string;
	fio?: string;
	loyaltyDescription?: string;
	loyaltyName?: string;
	file?: File | undefined;
	gender?: number;
	id?: string;
	link?: string;
	category?: string;
	role?: string;
}

export interface IValidatorsResponse {
	email?: boolean;
	password?: boolean;
	secondPassword?: boolean;
	age?: boolean;
	phoneNumber?: boolean;
	name?: boolean;
	cardNumber?: boolean;
	amount?: boolean;
	address?: boolean;
	fio?: boolean;
	loyaltyDescription?: boolean;
	loyaltyName?: boolean;
	file?: boolean;
	gender?: boolean;
	id?: boolean;
	link?: boolean;
	category?: boolean;
	role?: boolean;
}

export interface IAuthorization {
	email: string;
	password: string;
	role: 'customer' | 'assistant' | 'manager' | 'admin' | 'anonym';
}

export interface IRegistration {
	email: string;
	password: string;
	age: number;
	gender: number;
	fio: string;
}

export interface IAccount {
	id: string;
	user_id: string;
	created_at: Date;
	email: string;
	password: string;
	role: IRole;
	deleted: boolean;
}

export interface IUser {
	id: string;
}

export interface IAuthentication extends Request {
	accountId?: string;
	roleId?: string;
}

export interface IStatisticsForManager {
	issuedCards: number;
	activeCards: number;
	blockedCards: number;
	pointsBalance: number;
	storesCount: number;
	assistantsCount: number;
	age: Array<{ name: string; y: number }>;
	gender: Array<{ name: string; y: number }>;
}

export interface IStatisticsForAdmin {
	customers: number;
	businesses: number;
	businessAssistants: number;
	issuedCards: number;
	activeCards: number;
	blockedCards: number;
	age: Array<{ name: string; y: number }>;
	gender: Array<{ name: string; y: number }>;
}

export interface ISocketUser {
	userId: string;
	socketId: string;
	role: string;
}

// INTERFACES FOR DAO

export interface IGetAddressesByManagerId {
	id: string;
	offset?: number;
}

export interface ICreateAddress {
	name: string;
	business_id: string;
}

export interface IUpdateAddress {
	id: string;
	name: string;
}

export interface IDeleteAddress {
	id: string;
}

export interface ICreateApplication {
	name: string;
	text: string;
	user_role: string;
	user_id?: string;
	business_id?: string;
}

export interface IGetApplication {
	id: string;
}

export interface ICompleteApplication {
	id: string;
	updated_at: Date;
}

export interface IGetAssistants {
	businessId: string;
	offset?: number;
}

export interface ICreateAssistant {
	fio: string;
	work_address_id: string;
	business_id: string;
}

export interface IUpdateAssistant {
	id: string;
	fio: string;
	work_address_id: string;
}

export interface IDeleteAssistant {
	id: string;
}

export interface IDeleteAssistants {
	work_address_id: string;
}

export interface ICreateBusiness {
	name: string;
	phone_number: string;
	manager_id: string;
}

export interface IGetChatIdByUserId {
	user_id: string;
}

export interface ICreateChat {
	user_id: string;
}

export interface IGetChatUserByChatId {
	id: string;
}

export interface IGetAccountById {
	id: string;
}

export interface IGetAccountByEmail {
	email: string;
	role?: 'customer' | 'assistant' | 'manager' | 'admin' | 'anonym';
}

export interface IGetCustomerById {
	id: string;
}

export interface IGetAssistantById {
	id: string;
}

export interface IGetManagerById {
	id: string;
}

export interface IGetAdminById {
	id: string;
}

export interface ICreateCustomer {
	age: number;
	gender: number;
	fio: string;
}

export interface IUpdateAccountByEmail {
	email: string;
	password: string;
}

export interface IUpdateAccountById {
	id: string;
	password: string;
}

export interface IUpdateManagerById {
	id: string;
	business_id: string;
}

export interface IUpdateCustomerById {
	id: string;
	age: number;
	gender: number;
	fio: string;
}

export interface IGetBusinessIdByManagerId {
	id: string;
}

export interface IGetBusinessIdByAssistantId {
	id: string;
}

export interface IGetRoleId {
	id: string;
}

export interface ICreateAccount {
	email: string;
	password: string;
	user_id: string;
	role: string;
}

export interface IDeleteAccount {
	user_id: string;
}

export interface IDeleteAccounts {
	user_ids: string[];
}

export interface IGetIssuedCardByLoyaltyIdAndOwnerId {
	loyalty_id: string;
	owner_id: string;
}

export interface ICheckCardBelongsCustomer {
	id: string;
	owner_id: string;
}

export interface IGetIssuedCardById {
	id: string;
}

export interface IGetIssuedCardsByOwnerIdReturnLoyaltiesId {
	id: string;
}

export interface IGetIssuedCardByCardNumber {
	card_number: number;
}

export interface IGetIssuedCardsByOwnerIdReturnLoyaltiesImage {
	id: string;
}

export interface IIssueCard {
	card_number: number;
	loyalty_id: string;
	qrcode: string;
	owner_id: string;
}

export interface IGetIssuedCardBalance {
	card_number: number;
}

export interface ISetIssuedCardBalance {
	card_number: number;
	balance: number;
}

export interface IDeleteIssuedCard {
	card_number: number;
}

export interface IDeleteIssuedCards {
	loyalty_id: string;
}

export interface IGetLoyalties {
	loyaltiesId: string[];
}

export interface IGetLoyaltyRecommendations {
	id: string;
	loyaltiesId: string[];
}

export interface IGetLoyaltyWhereNotIn {
	id: string;
	loyaltiesId: string[];
}

export interface IGetLoyaltyByBusinessId {
	business_id: string;
}

export interface IDeleteLoyalty {
	id: string;
}

export interface IGetLoyaltyByAssistantId {
	id: string;
}

export interface ICreateLoyaltyProgram {
	name: string;
	category: string;
	description: string;
	image: string;
	business_id: string;
	conditions: Record<string, string>;
	payment_percent: number;
	points_to_rubles: number;
}

export interface IUpdateLoyaltyProgram {
	name: string;
	category: string;
	description: string;
	image: string;
	business_id: string;
	updated_at: Date;
	conditions: Record<string, string>;
	payment_percent: number;
	points_to_rubles: number;
}

export interface IGetMessages {
	chat_id: string;
}

export interface ICreateMessage {
	sender_id: string;
	chat_id: string;
	text: string;
}

export interface ISetMessagesRead {
	sender_id: string;
	chat_id: string;
	admin?: boolean;
}

export interface IGetIssuedCardByLoyaltyId {
	loyalty_id: string;
	active?: boolean;
	deleted?: boolean;
	points?: boolean;
}

export interface IGetIssuedCardStatistics {
	active?: boolean;
	deleted?: boolean;
}

export interface IGetAddressesByBusinessId {
	business_id: string;
}

export interface IGetAssistantsByBusinessId {
	business_id: string;
}

export interface IGetAgeCategoriesByLoyaltyId {
	loyalty_id: string;
	minAge?: number;
	maxAge?: number;
}

export interface IGetAgeCategoriesStatistics {
	minAge?: number;
	maxAge?: number;
}

export interface IGetGenderByLoyaltyId {
	loyalty_id: string;
	gender: number;
}

export interface IGetGenderStatistics {
	gender: number;
}

export interface IGetTransactionsByCardNumber {
	card_number: number;
	offset?: number;
}

export interface IGetTransactionsByAssistant {
	assistant_id: string;
	offset?: number;
}

export interface ICreateTransaction {
	amount: number;
	card_number: number;
	points: number;
	assistant_id: string;
}
