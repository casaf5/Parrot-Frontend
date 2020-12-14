import React, { useState } from 'react';
import './ChatSideNav.scss';
import { SideChatNavItem } from '../SideChatNavItem/SideChatNavItem';
import { SideChatAboutChannel } from '../SideChatAboutChannel/SideChatAboutChannel';
import { SideChatAboutUser } from '../SideChatAboutUser/SideChatAboutUser';
import { SideChatMembersList } from '../SideChatMembersList/SideChatMembersList';
import { SideChatPinnedItems } from '../SideChatPinnedItems/SideChatPinnedItems';
import { AddMemberToChannel } from '../AddMemberToChannel/AddMemberToChannel';
import { removeChannel } from '../../Actions/chatMessagesAction';
import { removePrivateMessage } from '../../Actions/userAction';
import { connect } from 'react-redux';

function _ChatSideNav({ chatName, closeSideNav, chatType, removeChannel, removePrivateMessage, chatData }) {
	const [addMemberWindowState, setAddMemberWindowState] = useState(false);
	const chatPreviewImage = chatType === 'channel' ? chatData.channelThumbnail : chatData.avatarImg;
	const pinnedItems = chatData.messages.filter((item) => item.isPinned);
	const removeItem = async () => {
		const { _id } = chatData;
		if (chatType === 'channel') await removeChannel(_id);
		else await removePrivateMessage(_id);
	};
	return (
		<div className='chat-side-details flex col'>
			<header className='main-nav-header flex space-between'>
				<section className='side-nav-chatname flex col'>
					<span className='header-main-title bold'>Details</span>
					<span className='header-sub-title'>{chatName}</span>
				</section>
				<i className='fas fa-plus' onClick={() => closeSideNav(false)} />
			</header>
			<section className='chat-thumbnail flex-center'>
				<img src={chatPreviewImage} alt='' />
			</section>
			<section className='actions-container flex-center'>
				{chatType === 'channel' && (
					<section className='action-item flex-center col'>
						<i className='far fa-user-plus' onClick={() => setAddMemberWindowState(true)} />
						<span>Add</span>
					</section>
				)}
				<section className='action-item flex-center col' onClick={removeItem}>
					<i className='fas fa-trash-alt'></i>
					<span>Delete</span>
				</section>
			</section>
			{chatData && (
				<section className='items-container'>
					<SideChatNavItem name='About'>
						{chatType === 'channel' ? (
							<SideChatAboutChannel chatData={chatData} />
						) : (
							<SideChatAboutUser chatData={chatData} />
						)}
					</SideChatNavItem>
					{chatData.sharedUsers && (
						// THIS WILL NOT SHOW IN THE PRIVATE MESSAGE SIDENAV
						<SideChatNavItem name='Members' counter={chatData.sharedUsers.length}>
							<SideChatMembersList />
						</SideChatNavItem>
					)}
					<SideChatNavItem name='Pinned' counter={pinnedItems.length}>
						<SideChatPinnedItems items={pinnedItems} />
					</SideChatNavItem>
				</section>
			)}
			{addMemberWindowState && <AddMemberToChannel toggleState={setAddMemberWindowState} />}
		</div>
	);
}

const mapDispatchToProps = {
	removeChannel,
	removePrivateMessage,
};

export const ChatSideNav = connect(null, mapDispatchToProps)(_ChatSideNav);
