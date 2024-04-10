import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid4 } from "uuid";

export const generateIdentifier = async (prefix = "") => {
	const uuid = uuid4();
	const maxLength = 10 - prefix.length;
	const truncatedUuid = uuid.replace(/-/g, "").substring(0, maxLength);
	return prefix + truncatedUuid.padEnd(maxLength, "0");
};

function parseErrorMessage(
	message: string | object | null
): string | object | null {
	if (typeof message === "string") {
		try {
			return JSON.parse(message);
		} catch {
			return message;
		}
	}
	return message;
}

export const ResponseObject = async (
	success: boolean,
	data: object | null | string = null,
	statusCode?: number
) => {
	return NextResponse.json(
		{ success, [success ? "data" : "error"]: parseErrorMessage(data) },
		{ status: statusCode || (!success ? 400 : 200) }
	);
};

export const generatePassword = async () => {
	var length = 8,
		charset =
			"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
		retVal = "";
	for (var i = 0, n = charset.length; i < length; ++i) {
		retVal += charset.charAt(Math.floor(Math.random() * n));
	}
	return retVal;
};

export const handleSession = async (req: NextRequest) => {
	const session = await getServerSession(options);
	if (!session?.user?.id) return null;
	return session;
};
