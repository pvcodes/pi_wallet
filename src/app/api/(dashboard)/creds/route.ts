import { ResponseObject } from "@/utils/helper";
import { NextRequest, NextResponse } from "next/server";
import dbClient from "@/db/index";
import { UpdateCredSchema } from "@/utils/validations/creds";
import { handleSession } from "@/utils/helper";
import type { User } from "@/lib/types/user";
import type { Session } from "next-auth";

export async function GET(req: NextRequest) {
	try {
		const session = await handleSession(req);
		// const session = await getSession();
		const creds = await dbClient.credential.findMany({
			where: {
				user_id: session?.user?.id,
			},
		});
		return ResponseObject(true, creds, 200);
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
		const { key, value } = await req?.json();
		console.log(23, { key, value });
		if (!session?.user?.id) {
			return ResponseObject(false, "user_id not found in sessions");
		}

		const cred = await dbClient.credential.create({
			data: {
				key,
				value,
				user_id: session?.user?.id,
			},
		});
		return ResponseObject(true, cred);
	} catch (error) {
		return ResponseObject(false, error as Error);
	}
}

export async function PUT(req: NextRequest) {
	try {
		const session = await handleSession(req);
		const payload = (await req?.json()) || {};
		const validatedPayload = await UpdateCredSchema.parseAsync(payload);
		const updatedCred = await dbClient.credential.update({
			where: {
				id: validatedPayload?.id,
			},
			data: {
				key: validatedPayload?.key,
				value: validatedPayload?.value,
			},
		});
		return ResponseObject(true, updatedCred);
	} catch (error) {
		return ResponseObject(
			false,
			error instanceof Error ? error.message : "Something went wrong"
		);
	}
}

export async function DELETE(req: NextRequest) {
	try {
		const session = await handleSession(req);
		const id = req.nextUrl?.searchParams?.get("id");
		if (id) {
			const deletedCred = await dbClient.credential.delete({
				where: {
					id: parseInt(id, 10),
				},
			});
			return ResponseObject(true, deletedCred);
		}
	} catch (error) {
		return ResponseObject(
			false,
			error instanceof Error ? error.message : "Something went wrong"
		);
	}
}
