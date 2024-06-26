import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import dbclient from "@/db/index";
import { generatePassword } from "@/utils/helper";

export const options: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
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
				try {
					const user = await dbclient.user.findUnique({
						where: { username: credentials?.username },
					});
					if (user && credentials?.password === user?.password) {
						// Convert the id to a string before returning the user object
						return { ...user, id: user.id.toString() };
					}
				} catch (error) {
					console.log(error);
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
				console.log(error);
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
				console.log(error);
				return null;
			}
		},
		session: ({ session, token, user }: any) => {
			if (session.user) {
				session.user.id = token.id;
			}
			return session;
		},
	},

	// pages: {
	// 	signIn: "/signin",
	// },
};
