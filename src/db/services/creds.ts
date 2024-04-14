import type { Credential, CredentialCreateInput } from "@/lib/types/creds";
import dbClient from "../index";

const getCreds = async (where: Partial<Credential>, fields?: string[]) => {
	let select: Record<string, boolean> | undefined;
	if (fields) {
		select = {};
		fields.forEach((field) => {
			select![field] = true;
		});
	}
	try {
		return await dbClient.credential.findMany({
			where,
			select,
		});
	} catch (error) {
		throw new Error(`Failed to get cred: ${(error as Error).message}`);
	}
};

const createCred = async (payload: CredentialCreateInput) => {
	try {
		return await dbClient.credential.create({ data: payload });
	} catch (error) {
		throw new Error(`Failed to get user: ${(error as Error).message}`);
	}
};

const updateCred = async (id: number, data: Partial<Credential>) => {
	// only return values, which are updated including respective id
	const select: Record<string, boolean> | undefined = { id: true };
	Object.keys(data).forEach((key) => {
		if ((data as Record<string, number | string | Date | undefined>)[key])
			select[key] = true;
	});

	try {
		return await dbClient.credential.update({
			where: { id },
			data,
			select,
		});
	} catch (error) {
		throw new Error(`Failed to update cred: ${(error as Error).message}`);
	}
};

const deleteCred = async (id: number) => {
	try {
		return await dbClient.credential.delete({
			where: { id },
		});
	} catch (error) {
		throw new Error(`Failed to delete cred: ${(error as Error).message}`);
	}
};

const credService = { createCred, getCreds, deleteCred, updateCred };

export default credService;
