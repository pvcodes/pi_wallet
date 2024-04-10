import { NextRequest, NextResponse } from "next/server";
import dbClient from "@/db";
import { handleSession, ResponseObject } from "@/utils/helper";
import { SignupSchema } from "@/utils/validations/user";
import type { User } from "@/lib/types/user";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export async function GET(req: NextRequest) {
	try {
		const session = await handleSession(req);
		const user = await dbClient.user.findUnique({
			where: {
				id: session?.user?.id,
			},
		});
		return ResponseObject(true, user);
	} catch (error) {
		return ResponseObject(
			false,
			error instanceof Error ? error.message : "Internal server error"
		);
	}
}

export async function POST(req: NextRequest) {
	try {
		const session = await handleSession(req);
		const payload: User = await req.json();
		console.log(22, payload);
		await SignupSchema.parseAsync(payload);

		const user = await dbClient.user.create({
			data: payload,
		});

		return ResponseObject(true, user);
	} catch (error) {
		console.log((error as Error).name);

		return ResponseObject(
			false,
			error instanceof Error ? error.message : "Internal server error"
		);
	}
}

export async function DELETE(req: NextRequest, next: NextResponse) {
	try {
		const session = await getServerSession(options);
		if (!session) return ResponseObject(false, "Unauthorized Access");

		const payload: User = await req.json();
		await SignupSchema.parseAsync(payload);

		// save to db
		const user = await dbClient.user.delete({
			where: { id: 1 },
		});

		return ResponseObject(true, user);
	} catch (error) {
		console.log((error as Error).name);

		return ResponseObject(
			false,
			error instanceof Error ? error.message : "Internal server error"
		);
	}
}
