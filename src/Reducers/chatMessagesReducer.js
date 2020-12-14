const INITIAL_STATE = null;

export function chatMessagesReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'SET_CHAT_DATA':
			return {
				...action.chatData,
			};
		case 'ADD_MESSAGE':
			return {
				...state,
				messages: [...state.messages, action.message],
			};
		case 'CREATE_CHANNEL':
			return {
				...action.channel,
			};
		case 'ADD_NEW_MEMBERS':
			return {
				...state,
				sharedUsers: [...state.sharedUsers, action.members],
			};
		case 'REMOVE_MEMBER_FROM_CHANNEL':
			return {
				...state,
				sharedUsers: state.sharedUsers.filter((member) => member._id !== action.member._id),
			};
		case 'TOGGLE_PINNED':
			return {
				...state,
				messages: state.messages.map((msg) =>
					msg.id !== action.msgId ? msg : { ...msg, isPinned: !msg.isPinned }
				),
			};
		case 'REMOVE_MSG':
			return {
				...state,
				messages: state.messages.filter((msg) => msg.id !== action.msgId),
			};
		case 'ADD_REACTION':
			return {
				...state,
				messages: state.messages.map((msg) => {
					if (msg.id === action.msgId) {
						let currEmoji = msg.reactions[action.reaction];
						msg.reactions[action.reaction] = currEmoji ? ++currEmoji : 1;
					}
					return msg;
				}),
			};
		case 'ADD_REPLY':
			return {
				...state,
				messages: state.messages.map((msg) => {
					if (msg.id === action.msgId) {
						msg.replies.push(action.reply);
					}
					return msg;
				}),
			};
		default:
			return state;
	}
}
