import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

export const options: NextAuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		}),
		CredentialsProvider({
			name: "credentials",
			credentials: {
				username: {
					label: "Username:",
					type: "text",
					placeholder: "John Doe",
				},
				password: {
					label: "Password:",
					type: "password",
					placeholder: "*********",
				},
			},
			async authorize(credentials) {
				const user = {
					id: "usr123213",
					name: "Pranjal Verma",
					password: "pswrd",
				};
				if (
					credentials?.username === user.name &&
					credentials?.password === user.password
				)
					return user;
				return null;
			},
		}),
	],
	// pages: {

	// }
};
