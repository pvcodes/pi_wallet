import { NextRequest, NextResponse } from "next/server";
import dbClient from "@/db";
import { ResponseObject, generateIdentifier } from "@/utils/helper";
import { SignupSchema } from "@/utils/validations/user";

interface User {
	username: string;
	email: string;
	password: string;
	name?: string;
}

// create user
// export async function POST(req: NextRequest, next: NextResponse) {
// 	try {
// 		const payload: User = await req.json();

// 		// zod/joi validation

// 		try {
// 			SignupSchema.parse(payload);
// 		} catch {
// 			return ResponseObject(false, "Data not valid");
// 		}

// 		// rest of the logic

// 		// hash password
// 		return ResponseObject(true, payload);
// 		const user = await dbClient.user.create({
// 			data: {
// 				...payload,
// 				id: await generateIdentifier("usr"),
// 			},
// 		});

// 		// JWT token, create

// 		// set cookie for auth

// 		// redirect to dashboard
// 		return NextResponse.json({ success: true, data: user });
// 	} catch (err) {
// 		return NextResponse.json({
// 			success: false,
// 			error: (err as Error)?.message,
// 		});
// 	}
// }
export async function POST(req: NextRequest, next: NextResponse) {
	try {
		const payload: User = await req.json();
		await SignupSchema.parseAsync(payload);

		// save to db
		const user = await dbClient.user.create({
			data: { id: await generateIdentifier("usr"), ...payload },
		});

		return ResponseObject(true, user);
	} catch (err) {
		console.log((err as Error).name);

		return ResponseObject(
			false,
			err instanceof Error ? err.message : "Internal server error"
		);
	}
}

// LOGIN USER
export async function GET(req: NextRequest) {
	return NextResponse.json({
		as: "asda",
		asd: req.nextUrl.pathname,
		data: await dbClient.user.findMany(),
	});

	const payload: User = await req.json();

	try {
		await dbClient.user.create({
			data: {
				...payload,
				id: await generateIdentifier("usr"),
			},
		});
	} catch (err) {
		return Response.json({
			success: false,
			error: (err as Error)?.message,
		});
	}
}
