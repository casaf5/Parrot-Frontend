import { httpService } from './httpService';

async function getUserById(id) {
	return httpService.get(`user/${id}`);
}
async function updateUser(user) {
	return httpService.put(`user/${user._id}`, user);
}

export const userService = {
	updateUser,
	getUserById,
};
