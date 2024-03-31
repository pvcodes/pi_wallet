import { ResponseObject } from "@/utils/helper";
import { LoginSchema } from "@/utils/validations/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	return NextResponse.json({ as: "asda", asd: req.nextUrl.pathname });
}

export async function PUT(req: NextRequest) {
	//
	try {
		const payload = await req.json();
		// const validation = LoginSchema({ usernameOrEmail:  });
		const valid = LoginSchema.parse({ usernameOrEmail: payload.name });

		console.log(valid);

		return ResponseObject(true, valid);
	} catch (error) {
		console.log(123, error as Error);
		return ResponseObject(false, (error as Error), 402);
	}
	// const payload = (await req.json()) || {};
	// console.log(123, payload);
}
