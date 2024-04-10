import dbClient from "../index";

const createCred = async (payload) => {
	try {
		return await dbClient.credential.create(payload);
	} catch (error) {
		console.log((error as Error)?.message);
	}
};

const getCred = async (credId: number) => {
	try {
		return await dbClient.credential.findUnique({
			where: {
				id: credId,
			},
		});
	} catch (error) {
		console.log((error as Error)?.message);
	}
};

const updateCred = async (credId: string, dataToUpdate) => {
	try {
		return await dbClient.credential.update({
			where: {
				id: credId,
			},
			data: dataToUpdate,
		});
	} catch (error) {
		console.log((error as Error)?.message);
	}
};

const deletCred = async (credId: string) => {
	try {
		return await dbClient.credential.delete({
			where: {
				id: credId,
			},
		});
	} catch (error) {
		console.log((error as Error)?.message);
	}
};

export const getAllCreds = async (user_id: number) => {
	return await dbClient.credential.findMany({ where: { user_id } });
};
