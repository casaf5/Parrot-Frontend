import { authService } from '../Services/authService';
import { userService } from '../Services/userService';
import { chatService } from '../Services/chatService';

const _setLoggedUser = (userData) => ({ type: 'SET_LOGGED_USER', userData });
const _updateUser = (user) => ({ type: 'UPDATE_USER', user });
const _addChannel = (channel) => ({ type: 'ADD_CHANNEL', channel });
const _addPrivateMsgChat = (pmData) => ({ type: 'ADD_PRIVATE_CHAT', pmData });
const _removePrivateMsg = (id) => ({ type: 'REMOVE_PRIVATE_CHAT', id });


export function updateUserData(user) {
	return async (dispatch) => {
		try {
			dispatch(_setLoggedUser(user));
		} catch (error) {
			console.log(`problem updating user :`, user);
		}
	};
}
export function updateUser(user) {
	return async (dispatch) => {
		try {
			await userService.updateUser(user);
			dispatch(_updateUser(user));
		} catch (error) {
			console.log(error);
		}
	};
}

export function removePrivateMessage(privateMsgId) {
	return async (dispatch, getState) => {
		dispatch(_removePrivateMsg(privateMsgId));
		await userService.updateUser(getState().userReducer);
	};
}

export function addChannelToUser(channel) {
	return async (dispatch, getState) => {
		try {
			const { _id, channelName } = await chatService.createNewChannel(channel);
			let newChannel = { _id, channelName };
			await dispatch(_addChannel(newChannel));
			await userService.updateUser(getState().userReducer);
		} catch (err) {
			console.log(err);
		}
	};
}

export function addPMToUser(pmData) {
	return async (dispatch, getState) => {
		try {
			await dispatch(_addPrivateMsgChat(pmData));
			await userService.updateUser(getState().userReducer);
		} catch (err) {
			console.log(err);
		}
	};
}

export function addNewUser(credentials) {
	return async (dispatch) => {
		try {
			const data = await authService.signup(credentials);
			console.log('data', data);
			const { err, user } = data;
			console.log('err', err, 'user', user);
			if (err) return { err, sucsses: false };
			console.log('from action', user);
			dispatch(_setLoggedUser(user));
			return { user, sucsses: true };
		} catch (error) {
			console.log(error);
		}
	};
}

export function checkCredentials(credentials) {
	return async (dispatch) => {
		try {
			const data = await authService.login(credentials);
			dispatch(_setLoggedUser(data));
			return data;
		} catch (error) {
			console.log(error);
		}
	};
}

export function checkForLoggedUser() {
	return async (dispatch) => {
		try {
			const auth = await authService.authUserToken();
			if (auth.user) dispatch(_setLoggedUser(auth.user));
			else dispatch(_setLoggedUser({ isAuth: false }));
		} catch (err) {
			console.log(err);
		}
	};
}
