import dbClient from "../index";

const createUser = async (payload) => {
	try {
		return await dbClient.user.create(payload);
	} catch (error) {
		console.log((error as Error)?.message);
	}
};

const getUser = async (userId: string) => {
	try {
		return await dbClient.user.findUnique({
			where: {
				id: userId,
			},
		});
	} catch (error) {
		console.log((error as Error)?.message);
	}
};

const updateUser = async (userId: string, dataToUpdate) => {
	try {
		return await dbClient.user.update({
			where: {
				id: userId,
			},
			data: dataToUpdate,
		});
	} catch (error) {
		console.log((error as Error)?.message);
	}
};

const deletUser = async (userId: string) => {
	try {
		return await dbClient.user.delete({
			where: {
				id: userId,
			},
		});
	} catch (error) {
		console.log((error as Error)?.message);
	}
};


