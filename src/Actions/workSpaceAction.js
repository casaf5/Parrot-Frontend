import { workSpaceService } from '../Services/workSpaceService';

const _setWorkSpaceData = (workSpaceData) => ({ type: 'SET_WORKSPACE_DATA', workSpaceData });
const _setWorkSpaceUsersStatus = (users) => ({ type: 'SET_USERS_STATUS', users });
const _userUpdateInWorkspace = (user) => ({ type: 'UPDATE_USER_SETTINGS', user });

export function setWorkSpaceData(id) {
	return async (dispath) => {
		try {
			const data = await workSpaceService.getWorkSpaceData(id);
			dispath(_setWorkSpaceData(data));
		} catch (err) {
			console.log(err);
		}
	};
}

export function updateUsersStatus(users) {
	return async (dispatch) => {
		dispatch(_setWorkSpaceUsersStatus(users));
	};
}

export function updateWorkspaceUserData(userNewPrefs) {
	return async (dispatch, getState) => {
		const wpId = getState().workSpaceReducer._id;
		await workSpaceService.updateUserInWorkspace(wpId, userNewPrefs);
		dispatch(_userUpdateInWorkspace(userNewPrefs));
	};
}
