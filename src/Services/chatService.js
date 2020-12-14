import { httpService } from './httpService';

async function getChatData({ type, _id }) {
	return httpService.get(`chat/${type === 'direct' ? 'direct/' + _id : _id}`);
}

async function updatePublicChatData(chatData) {
	return httpService.put(`chat/${chatData._id}`, chatData);
}
async function updatePrivateChatData(chatData) {
	return httpService.put(`chat/direct/${chatData._id}`, chatData);
}

async function createNewChannel(channel) {
	return httpService.post(`chat/create`, channel);
}

async function removeChannel(id) {
	console.log('removind',id)
	return httpService.delete(`chat/${id}`);
}

export const chatService ={
	getChatData,
	updatePublicChatData,
	updatePrivateChatData,
	createNewChannel,
	removeChannel
};
