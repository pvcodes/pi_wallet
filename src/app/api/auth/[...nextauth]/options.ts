import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import dbclient from "@/db/index";
import { generatePassword } from "@/utils/helper";
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
				console.log(123, {credentials});
				try {
					const user = await dbclient.user.findUnique({
						where: { username: credentials?.username },
					});
					if (user && credentials?.password === user?.password) {
						// Convert the id to a string before returning the user object
						return { ...user, id: user.id.toString() };
					}
				} catch (error) {
					console.log(1, error);
				}
				return null;
			},
		}),
	],
	callbacks: {
		async signIn({ profile, account }) {
			let email;
			if (account?.provider === "google" && profile?.email) {
				email = profile.email;
			} else if (account?.provider === "github" && profile?.email) {
				email = profile.email;
			}
			try {
				if (email) {
					const existingUser = await dbclient.user.findUnique({
						where: {
							email,
						},
					});
					if (!existingUser) {
						await dbclient.user.create({
							data: {
								username: profile?.email as string,
								email: profile?.email as string,
								password: await generatePassword(),
								name: profile?.name,
							},
						});
					}
				}
				return true;
			} catch (error) {
				console.log(1, error);
				return false;
			}
		},
		jwt: async ({ token }: any) => {
			try {
				const user = await dbclient.user.findUnique({
					where: {
						email: token?.email,
					},
					select: {
						id: true,
					},
				});
				if (user) {
					token.id = user?.id;
					return token;
				}
			} catch (error) {
				console.log(2, error);
				return null;
			}
			// console.log(23, "jwt", token);
		},
		session: ({ session, token, user }: any) => {
			if (session.user) {
				session.user.id = token.id;
			}
			// // console.log(23, "session", token);
			return session;
		},
	},

	pages: {
		signIn: "/signin",
	},
};
