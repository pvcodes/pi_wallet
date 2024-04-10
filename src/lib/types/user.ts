import { ISODateString } from "next-auth";

// export interface Session {
// 	user?: {
// 		id: number | null;
// 		name?: string | null;
// 		email?: string | null;
// 		image?: string | null;
// 	};
// 	expires: ISODateString;
// }

export interface User {
	username: string;
	email: string;
	password: string;
	name?: string;
}

export interface Credential {
	key: string;
	value: string;
}
