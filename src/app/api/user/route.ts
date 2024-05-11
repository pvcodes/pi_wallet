import { NextRequest, NextResponse } from "next/server";
import type { Session } from "next-auth";
import userService from "@/db/services/user";
import type { User } from "@/lib/types/user";

import { handleSession, ResponseObject } from "@/utils/helper";
import { userSignupSchema, userUpdateSchema } from "@/utils/validations/user";

export async function GET(req: NextRequest) {
	try {
		const session = (await handleSession(req)) as Session;

		const user = await userService.getUser(session.user.id);
		return ResponseObject(true, {
			mesasage: "user found successfully",
			user,
		});
	} catch (error) {
		console.log(error);
		return ResponseObject(false, error as Error);
	}
}

export async function POST(req: NextRequest) {
	try {
		await handleSession(req);

		const payload: User = await req?.json();
		await userSignupSchema.parseAsync(payload);
		console.log(payload);
		const user = userService.createUser(payload);
		return ResponseObject(true, {
			message: "user created successfully",
			user,
		});
	} catch (error) {
		console.log(error);
		return ResponseObject(false, error as Error);
	}
}

export async function PUT(req: NextRequest) {
	try {
		const session = (await handleSession(req)) as Session;

		const payload: User = await req?.json();
		await userUpdateSchema.parseAsync(payload);
		const user = await userService.updateUser(session.user.id, payload);

		return ResponseObject(true, {
			message: "user updated successfully",
			user,
		});
	} catch (error) {
		console.log(error);
		return ResponseObject(false, error as Error);
	}
}

export async function DELETE(req: NextRequest, next: NextResponse) {
	try {
		const session = (await handleSession(req)) as Session;
		console.log(21, session.user);
		const user = await userService.deleteUser(session.user.id);
		return ResponseObject(true, {
			message: "user deleted successfully",
			user,
		});
	} catch (error) {
		console.log(error);
		return ResponseObject(false, error as Error);
	}
}
