const INITIAL_STATE = null;

export function workSpaceReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'SET_WORKSPACE_DATA':
			return {
				...action.workSpaceData,
			};
		case 'SET_USERS_STATUS': {
			return {
				...state,
				onlineUsers: action.users,
			};
		}
		case 'UPDATE_USER_SETTINGS': {
			return {
				...state,
				sharedUsers: state.sharedUsers.map((user) => {
					if (user._id === action.user._id) {
						return action.user;
					}
					return user;
				}),
			};
		}
		default:
			return state;
	}
}
