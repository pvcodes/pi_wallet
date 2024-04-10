import dbClient from "./index";
type UserIdentifier = { id?: string; email?: string };

const getUser = async (key: UserIdentifier) => {
	const user = await dbClient.user.findUnique({
		where: {
			key,
		},
		select: {
			id: true,
		},
	});
};
