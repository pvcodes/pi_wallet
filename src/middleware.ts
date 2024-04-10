// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { ResponseObject } from "./utils/helper";
// import { options } from "./app/api/auth/[...nextauth]/options";
export { default } from "next-auth/middleware";
// import { session as clientSession } from "@/app/session";
// import { getSession } from "next-auth/react";
// import { getServerSession } from "next-auth";

// // // This function can be marked `async` if using `await` inside
// // async function authMiddleware() {
// // 	console.log(2, 'authmiddleware');

// // 	const session = await serverSession();
// // 	console.log(533, session)
// // 	if (!session) {
// // 		return {
// // 			valid: false,
// // 			response: ResponseObject(
// // 				false,
// // 				{
// // 					message: "unauthorized access",
// // 				},
// // 				401
// // 			),
// // 		};
// // 	}
// // 	return {
// // 		valid: true,
// // 		response: session,
// // 	};
// // }

// async function userValidMiddleware(request: NextRequest) {
// 	// const session =
// 	return NextResponse.next();
// }

// export async function middleware(request: NextRequest) {
// 	console.log(2, "mainmiddleware");
// 	// const session = getServerSession();
// 	// console.log(324, session);
// 	// return NextResponse.next();

// 	if (request.nextUrl.pathname.startsWith("/api")) {
// 		console.log(await getSession());
// 		const session = await getSession({ req: request });
// 		console.log(5543, { session });
// 		// const response = NextResponse.next();
// 		// const session = await clientSession();
// 		// if (session) request.user = { id: session?.user?.id };
// 		// 	const { valid, response } = await authMiddleware();
// 		// 	if (!valid) return response;

// 		// 	console.log(545, response);
// 		// 	// request.userId = response.user.userId;

// 		return NextResponse.next();
// 	}
// 	// if (request.nextUrl.pathname === "/api/creds") {
// 	// 	return userValidMiddleware(request);
// 	// 	// return NextResponse.next();
// 	// }
// 	// return NextResponse.redirect(new URL("/home", request.url));
// }

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getSession } from "next-auth/react";

// export async function middleware(request: NextRequest) {
// 	console.log(33, request.nextUrl.pathname);
// 	const response = NextResponse.next();

// 	return NextResponse.next();
// }

export const config = {
	matcher: ["/dashboard"],
};
