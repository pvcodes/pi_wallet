import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export { default } from "next-auth/middleware";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	if (request.nextUrl.pathname === "/api/creds") {
		return NextResponse.json({ a: "hello" });
	}
	// return NextResponse.redirect(new URL("/home", request.url));
}

// // See "Matching Paths" below to learn more
export const config = {
	matcher: ["/api/creds"],
};
