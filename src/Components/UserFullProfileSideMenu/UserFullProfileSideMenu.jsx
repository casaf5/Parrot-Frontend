import React, { useContext } from 'react';
import './UserFullProfileSideMenu.scss';
import { addPMToUser } from '../../Actions/userAction';
import { ChatContext } from '../../ParrotApp';
import { connect } from 'react-redux';

function _UserFullProfileSideMenu({ userToShow, closeProfile, addPMToUser, userData }) {
	const createdDirectMsgs = userData.directMessages;
	const { updateChatToRender } = useContext(ChatContext);
	const addNewPMChat = async () => {
		const { _id, nickName, avatarImg } = userToShow;
		if (!createdDirectMsgs.some((user) => user._id === _id)) {
			const newPMData = { type: 'direct', _id, directMsgName: nickName, avatarImg, messages: [] };
			await addPMToUser(newPMData);
		}
		updateChatToRender({ type: 'direct', _id });
	};
	return (
		<div className='full-user-profile flex col'>
			<header className='main-nav-header flex space-between'>
				<span className='header-main-title bold'>Profile</span>
				<i className='fas fa-plus' onClick={() => closeProfile(null)} />
			</header>
			<section className='user-main-detials flex col'>
				<section className='user-profile-img-wrapper flex-center'>
					<img src={userToShow.avatarImg} alt='profile-pic' />
				</section>
				<span className='bold'>{userToShow.userName}</span>
			</section>
			<section className='user-actions flex-center'>
				<section className='action-item flex-center col' onClick={addNewPMChat}>
					<i className='far fa-comment-dots'></i>
					<span>Message</span>
				</section>
			</section>
			<section className='user-raw-details flex col '>
				<span className='detail-title'>Display Name:</span>
				<span className='user-display-name'>{userToShow.nickName}</span>
				<span className='detail-title'>Local Time</span>
				<span className='user-local-time'>{new Date().toLocaleTimeString()}</span>
				{/* <span className='detail-title'>Email address</span> */}
				{/* <span className='user-email'>{userToShow.email} </span> */}
			</section>
		</div>
	);
}

const mapStateToProps = (state) => ({
	userData: state.userReducer,
});

const mapDispatchToProps = {
	addPMToUser,
};

export const UserFullProfileSideMenu = connect(mapStateToProps, mapDispatchToProps)(_UserFullProfileSideMenu);
