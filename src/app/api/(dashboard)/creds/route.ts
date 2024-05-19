import { NextRequest } from "next/server";
import type { Session } from "next-auth";

import credService from "@/db/services/creds";
import { handleSession, ResponseObject } from "@/utils/helper";
import { CreateCredSchema, UpdateCredSchema } from "@/utils/validations/creds";
import type { ZodError } from "zod";

export async function GET(req: NextRequest) {
	try {
		const session = (await handleSession(req)) as Session;

		const creds = await credService.getCreds({
			user_id: session.user.id,
		});
		return ResponseObject(true, creds, 200);
	} catch (error) {
		console.log(error);
		return ResponseObject(false, error as Error);
	}
}

export async function POST(req: NextRequest) {
	try {
		const session = (await handleSession(req)) as Session;
		if (!session?.user?.id) {
			const e = new Error("unauthorized access");
			e.name = "AuthError";
			throw e;
		}

		const payload = (await req?.json()) || {};
		const { key, value } = await CreateCredSchema.parseAsync(payload);
		const cred = await credService.createCred({
			key,
			value,
			user_id: session?.user?.id,
		});
		return ResponseObject(true, cred, 201);
	} catch (error) {
		let errorMsg;
		switch ((error as Error).name) {
			case "AuthError":
				errorMsg = "unauthorized access";
				break;
			case "ZodError":
				errorMsg = (error as ZodError)?.issues[0]?.message;
			default:
				errorMsg = (error as Error)?.message || "Something went wrong";
		}
		return ResponseObject(false, errorMsg);
	}
}

export async function PUT(req: NextRequest) {
	try {
		const session = (await handleSession(req)) as Session;

		const payload = (await req?.json()) || {};
		const { key, value, id } = await UpdateCredSchema.parseAsync(payload);

		const cred = await credService.updateCred(id, {
			key,
			value,
		});
		return ResponseObject(true, cred);
	} catch (error) {
		console.log(error);
		return ResponseObject(false, error as Error);
	}
}

export async function DELETE(req: NextRequest) {
	try {
		const session = await handleSession(req);

		const id = parseInt(req.nextUrl?.searchParams?.get("id") ?? "", 10);
		if (id) {
			const cred = await credService.deleteCred(id);
			return ResponseObject(true, cred);
		}
	} catch (error) {
		console.log(error);
		return ResponseObject(false, error as Error);
	}
}
