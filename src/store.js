import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { chatMessagesReducer } from './Reducers/chatMessagesReducer';
import { userReducer } from './Reducers/userReducer';
import { workSpaceReducer } from './Reducers/workSpackReducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
	chatMessagesReducer,
	userReducer,
	workSpaceReducer,
});
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
