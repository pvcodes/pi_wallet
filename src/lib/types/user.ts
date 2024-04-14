export type User = {
	id: number;
	username: string;
	email: string;
	password: string;
	name?: string;
};

export type UserCreateInput = {
	username: string;
	email: string;
	password: string;
};

export type UserUpdateInput = {
	username: string;
	email: string;
	password: string;
	master_key: string;
};
