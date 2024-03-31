import { NextResponse } from "next/server";
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
		{ status: statusCode || (!success ? 500 : 200) }
	);
};
