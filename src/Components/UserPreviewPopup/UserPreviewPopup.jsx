import React, { useContext, useEffect } from 'react';
import './UserPreviewPopup.scss';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { addPMToUser } from '../../Actions/userAction';
import { ChatContext } from '../../ParrotApp';
import { FullProfileContext } from '../../Pages/Chat/Chat';

function _UserPreviewPopup({ workSpaceData, userData, addPMToUser, userId, close, clickPos }) {
	const userToShow = workSpaceData.sharedUsers.find((user) => user._id === userId);
	const createdDirectMsgs = userData.directMessages;
	const { updateChatToRender } = useContext(ChatContext);
	const setFullProfile = useContext(FullProfileContext);

	const addNewPMChat = async () => {
		const { _id, userName, avatarImg } = userToShow;
		if (!createdDirectMsgs.some((user) => user._id === _id)) {
			const newPMData = { type: 'direct', _id, directMsgName: userName, avatarImg, messages: [] };
			await addPMToUser(newPMData);
		}
		updateChatToRender({ type: 'direct', _id });
		close(false);
	};
	const currTime = new Date().toLocaleTimeString();
	const openFullProfile = () => {
		setFullProfile(userToShow);
		close(false);
	};
	return (
		<div
			className='user-preview-popup-wrapper flex col'
			style={{ top: clickPos.y + 'px', left: clickPos.x + 'px' }}
		>
			<div className='close-screen' onClick={() => close(false)} />
			{userToShow && (
				<div className='preview-content flex col'>
					<img src={userToShow.avatarImg} alt='user-image' />
					<span className='username'>{userToShow.userName}</span>
					<span className='view-profile' onClick={openFullProfile}>
						View full profile
					</span>

					<span className='local-time'>
						Local time:
						<br />
						{currTime}
					</span>
					<button className='btn-pm-message' onClick={addNewPMChat}>
						Message
					</button>
				</div>
			)}
			{!userToShow && <CircularProgress />}
		</div>
	);
}

const mapStateToProps = (state) => ({
	workSpaceData: state.workSpaceReducer, //!i need that?
	userData: state.userReducer,
});

const mapDispatchToProps = {
	addPMToUser,
};

export const UserPreviewPopup = connect(mapStateToProps, mapDispatchToProps)(_UserPreviewPopup);
