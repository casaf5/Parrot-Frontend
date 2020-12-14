const { chatService } = require('../Services/chatService');

//DISPATCH FUNCTIONS

const _addMessage = (message) => ({ type: 'ADD_MESSAGE', message });
const _updateChat = (chatData) => ({ type: 'SET_CHAT_DATA', chatData });
const _addMembers = (members) => ({ type: 'ADD_NEW_MEMBERS', members });
const _removeMember = (member) => ({ type: 'REMOVE_MEMBER_FROM_CHANNEL', member });
const _removeChannel = (channelId) => ({ type: 'REMOVE_CHANNEL', channelId });
const _removeMsg = (msgId) => ({ type: 'REMOVE_MSG', msgId });
const _setPinnedStatus = (msgId) => ({ type: 'TOGGLE_PINNED', msgId });
const _addReaction = (msgId, reaction) => ({ type: 'ADD_REACTION', msgId, reaction });
const _addReplay = (msgId, reply) => ({ type: 'ADD_REPLY', msgId, reply });

//EXPORTED ACTIONS

export function getChatData(chatData) {
	return async (dispatch) => {
		try {
			const data = await chatService.getChatData(chatData);
			dispatch(_updateChat(data));
			return data;
		} catch (err) {
			console.log(err);
		}
	};
}
//!can merge this with the next function and add isPrivate...
export function sendPublicMessage(message) {
	return async (dispatch, getState) => {
		try {
			dispatch(_addMessage(message));
			let updatedData = getState().chatMessagesReducer;
			await chatService.updatePublicChatData(updatedData);
		} catch (error) {
			console.log(error);
		}
	};
}
export function sendPrivateMessage(message) {
	return async (dispatch, getState) => {
		try {
			dispatch(_addMessage(message));
			await chatService.updatePrivateChatData(getState().chatMessagesReducer);
		} catch (error) {
			console.log(error);
		}
	};
}

export function updateChatData(chatData) {
	return async (dispatch) => {
		await dispatch(_updateChat(chatData));
	};
}
export function removeMsgFromChat(msgId, isPrivate) {
	return async (dispatch, getState) => {
		try {
			dispatch(_removeMsg(msgId));
			let updatedData = getState().chatMessagesReducer;
			if (isPrivate) await chatService.updatePrivateChatData(updatedData);
			else await chatService.updatePublicChatData(updatedData);
		} catch (err) {
			console.log(err);
		}
	};
}

export function addReactionToMsg(msgId, reaction, isPrivate) {
	return async (dispatch, getState) => {
		try {
			dispatch(_addReaction(msgId, reaction));
			let updatedData = getState().chatMessagesReducer;
			if (isPrivate) await chatService.updatePrivateChatData(updatedData);
			else await chatService.updatePublicChatData(updatedData);
		} catch (err) {
			console.log(err);
		}
	};
}

export function addReplyToMsg(msgId, reply, isPrivate) {
	return async (dispatch, getState) => {
		try {
			dispatch(_addReplay(msgId, reply));
			let updatedData = getState().chatMessagesReducer;
			if (isPrivate) await chatService.updatePrivateChatData(updatedData);
			else await chatService.updatePublicChatData(updatedData);
		} catch (err) {
			console.log(err);
		}
	};
}

export function toggleMsgPinnedStatus(msgId, isPrivate) {
	return async (dispatch, getState) => {
		try {
			dispatch(_setPinnedStatus(msgId));
			let updatedData = getState().chatMessagesReducer;
			if (isPrivate) await chatService.updatePrivateChatData(updatedData);
			else await chatService.updatePublicChatData(updatedData);
		} catch (err) {
			console.log(err);
		}
	};
}

export function addNewMembers(members) {
	return async (dispatch, getState) => {
		dispatch(_addMembers(members));
		await chatService.updatePublicChatData(getState().chatMessagesReducer);
	};
}

export function removeMemberFromChannel(member) {
	return async (dispatch, getState) => {
		dispatch(_removeMember(member));
		await chatService.updatePublicChatData(getState().chatMessagesReducer);
	};
}

export function removeChannel(channelId) {
	return async (dispatch) => {
		await chatService.removeChannel(channelId);
		dispatch(_removeChannel(channelId));
	};
}


