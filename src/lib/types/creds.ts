export interface Credential {
	id: number;
	key: string;
	value: string;
	user_id: number;
	last_updated: Date;
}
export type CredentialCreateInput = {
	key: string;
	value: string;
	user_id: number;
};
