import { httpService } from './httpService';

async function getWorkSpaceData(id) {
	return httpService.get(`workspace/${id}`);
}

async function updateUserInWorkspace(workSpaceId, userData) {
	return httpService.put(`workspace/update/${workSpaceId}`, userData);
}

export const workSpaceService = {
	getWorkSpaceData,
	updateUserInWorkspace
};
