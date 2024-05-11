import { NextRequest } from "next/server";
import type { Session } from "next-auth";

import credService from "@/db/services/creds";
import { handleSession, ResponseObject } from "@/utils/helper";
import { UpdateCredSchema } from "@/utils/validations/creds";

export async function GET(req: NextRequest) {
	try {
		const session = (await handleSession(req)) as Session;

		const cred = await credService.getCreds({
			user_id: session.user.id,
		});
		return ResponseObject(true, cred, 200);
	} catch (error) {
		console.log(error);
		return ResponseObject(false, error as Error);
	}
}

export async function POST(req: NextRequest) {
	try {
		const session = (await handleSession(req)) as Session;
		if (!session?.user?.id) {
			return ResponseObject(false, "unauthorized access");
		}

		const { key, value } = await req?.json();
		const cred = await credService.createCred({
			key,
			value,
			user_id: session?.user?.id,
		});
		return ResponseObject(true, cred);
	} catch (error) {
		console.log(error);
		return ResponseObject(false, error as Error);
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
