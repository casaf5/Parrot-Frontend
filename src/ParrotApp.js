import React, { useEffect, useState } from 'react';
import './style.scss';
import { socketService } from './Services/socketService';
import { getChatData, updateChatData } from './Actions/chatMessagesAction';
import { setWorkSpaceData, updateUsersStatus } from './Actions/workSpaceAction';
import { checkForLoggedUser, updateUserData } from './Actions/userAction';
import { AppHeader } from './Components/AppHeader/AppHeader';
import { SideNav } from './Components/SideNav/SideNav';
import { Chat } from './Pages/Chat/Chat';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { LoadingScreen } from './Components/LoadingScreen/LoadingScreen';
const DEFAULT_WORKSPACE = '5fd11eb793f4a897f4d3557e';

export const ChatContext = React.createContext(null);

function ParrotApp({
	getChatData,
	updateChatData,
	setWorkSpaceData,
	workSpace,
	checkForLoggedUser,
	userData,
	updateUsersStatus,
	updateUserData,
}) {
	const { isAuth } = userData;
	const [lastChatId, setLastChatId] = useState(null);
	const [openSideNavOnMobile, setOpenSideNavOnMobile] = useState(false);

	useEffect(() => {
		checkForLoggedUser();
		//todo: check if this is right. for the first time ...
		setWorkSpaceData(DEFAULT_WORKSPACE);
		socketService.emit('newUserLoggedToWorkspace', DEFAULT_WORKSPACE, userData._id);
		socketService.on('newMessagesOnChat', async ({ lastUpdatedData }) => {
			console.log('updataed ! ', lastUpdatedData);
			await updateChatData(lastUpdatedData);
		});
		socketService.on('workSpaceUpdate', async (onlineUsers) => {
			await setWorkSpaceData(DEFAULT_WORKSPACE);
			await updateUsersStatus(onlineUsers);
		});
		socketService.on('userDataUpdate', async (userData) => {
			await updateUserData(userData);
		});
	}, [isAuth]);

	const updateChatToRender = async (chatData) => {
		await getChatData(chatData);
		//TODO: MAYBE PUT IT IN THE DROPDOWN DIRECTLY
		//BECAUSE Chat Is subscribing to the store
		if (lastChatId) socketService.emit('disconnectedFromChat', lastChatId);
		socketService.emit('connectToChat', chatData, (serverChatId) => {
			setLastChatId(serverChatId);
		});
	};

	return (
		<div className='App main-layout'>
			{isAuth === true && workSpace && (
				<>
					<AppHeader />
					<ChatContext.Provider value={{ updateChatToRender, setOpenSideNavOnMobile }}>
						<SideNav workSpace={workSpace} isOpenOnMobile={openSideNavOnMobile} />
						<Chat navIsOpen={openSideNavOnMobile} />
					</ChatContext.Provider>
				</>
			)}
			{isAuth === 'Verifying' && <LoadingScreen />}
			{!isAuth && <Redirect to='/home' />}
		</div>
	);
}
const mapStateToProps = (state) => ({
	workSpace: state.workSpaceReducer,
	userData: state.userReducer,
});

const mapDispatchToProps = {
	getChatData,
	updateChatData,
	setWorkSpaceData,
	checkForLoggedUser,
	updateUsersStatus,
	updateUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ParrotApp);
