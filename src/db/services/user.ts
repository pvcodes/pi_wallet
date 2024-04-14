import type { UserCreateInput, UserUpdateInput } from "@/lib/types/user";
import dbClient from "../index";

const getUser = async (id: number) => {
	try {
		const data = await dbClient.user.findUnique({
			where: { id },
		});
		if (!data) throw new Error(`User with ID ${id} not found`);
		return data;
	} catch (error) {
		throw new Error(`Failed to get user: ${(error as Error).message}`);
	}
};

const createUser = async (data: UserCreateInput) => {
	try {
		return await dbClient.user.create({ data });
	} catch (error) {
		throw new Error(`Failed to create user: ${(error as Error).message}`);
	}
};

const updateUser = async (id: number, data: Partial<UserUpdateInput>) => {
	// only return values, which are updated including respective id
	const select: Record<string, boolean> | undefined = { id: true };
	Object.keys(data).forEach((key) => {
		if ((data as Record<string, string>)[key]) select[key] = true;
	});

	try {
		return await dbClient.user.update({
			where: { id },
			data,
			select,
		});
	} catch (error) {
		throw new Error(`Failed to update user: ${(error as Error).message}`);
	}
};

const deleteUser = async (id: number) => {
	try {
		return await dbClient.user.delete({
			where: { id },
		});
	} catch (error) {
		throw new Error(`Failed to delete user: ${(error as Error).message}`);
	}
};

const userService = { getUser, createUser, updateUser, deleteUser };

export default userService;
