const INITIAL_STATE = {
	isAuth: 'Verifying',
};

export function userReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'SET_LOGGED_USER':
			return {
				...state,
				isAuth: true,
				...action.userData,
			};
		case 'ADD_CHANNEL':
			return {
				...state,
				channels: [...state.channels, action.channel],
			};
		case 'ADD_PRIVATE_CHAT':
			return {
				...state,
				directMessages: [...state.directMessages, action.pmData],
			};
		case 'REMOVE_CHANNEL':
			return {
				...state,
				channels: state.channels.filter((c) => c._id !== action.channelId),
			};
		case 'REMOVE_PRIVATE_CHAT': {
			return {
				...state,
				directMessages: state.directMessages.filter((p) => p._id !== action.id),
			};
		}
		default:
			return state;
	}
}
