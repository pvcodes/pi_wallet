import dbClient from "./index";

type UserIdentifier = { id?: string; email?: string };

const getUser = async (key: UserIdentifier) => {
	let whereClause;
	if (key.id) {
		whereClause = { id: parseInt(key.id, 10) };
	} else if (key.email) {
		whereClause = { email: key.email };
	} else {
		throw new Error("Either id or email must be provided.");
	}

	const user = await dbClient.user.findUnique({
		where: whereClause,
		select: {
			id: true,
		},
	});
};
