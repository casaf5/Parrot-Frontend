import React, { useState } from 'react';
import './ChannelMembersList.scss';
import { PopupWindow } from '../GeneralStructure/PopupWindow/PopupWindow';
import { InputBox } from '../GeneralStructure/InputBox/InputBox';
import { UserPreviewPopup } from '../UserPreviewPopup/UserPreviewPopup';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { removeMemberFromChannel } from '../../Actions/chatMessagesAction';
import { socketService } from '../../Services/socketService';

export function _ChannelMembersList({ close, chatData, remove, loggedUser }) {
	const [filterBy, setFilterBy] = useState('');
	const [clickedUserId, setUserId] = useState(null);
	const [clickPos, setClickPos] = useState({ x: null, y: null });

	const onNameClicked = (ev, userId) => {
		var { clientX, clientY } = ev;
		if (clientX + 300 > window.innerWidth) clientX = clientX - 300;
		if (clientY + 350 > window.innerHeight) clientY = clientY - 350;
		setClickPos({ x: clientX, y: clientY });
		setUserId(userId);
	};
	const popUpTitle = `${chatData.sharedUsers.length} members in ${chatData.channelName}`;
	const handleChange = (value) => {
		setFilterBy(value);
	};
	const filteredMembers = () => {
		return chatData.sharedUsers.filter((member) => member.nickName.toLowerCase().includes(filterBy));
	};
	const removeMember = async (ev, member) => {
		ev.stopPropagation();
		await remove(member);
		// socketService.emit('chatUpdated', { chatType: 'channel', _id: chatData._id });
		socketService.emit('removeUserFromChannel', { channelId: chatData._id, userId: member._id });
	};
	return (
		<div>
			<PopupWindow close={close} width='500px' height='600px' title={popUpTitle}>
				<InputBox
					value={filterBy}
					handler={handleChange}
					placeholder='Search in channel members...'
					width='450px'
				/>
				<ul className='channel-members-container clean-list'>
					{chatData &&
						filteredMembers().map((member) => {
							return (
								<li
									key={member._id}
									className='flex align-center'
									onClick={(ev) => onNameClicked(ev, member._id)}
								>
									<Avatar variant='square' src={member.avatarImg} />
									<span>{member.nickName}</span>
									{member._id !== loggedUser._id && loggedUser._id === chatData.createdBy._id && (
										<button className='btn-remove' onClick={(ev) => removeMember(ev, member)}>
											Remove
										</button>
									)}
								</li>
							);
						})}
				</ul>
				{clickedUserId && <UserPreviewPopup userId={clickedUserId} close={close} clickPos={clickPos} />}
			</PopupWindow>
		</div>
	);
}

const mapStateToProps = (state) => ({
	chatData: state.chatMessagesReducer,
	loggedUser: state.userReducer,
});

const mapDispatchToProps = {
	remove: removeMemberFromChannel,
};
export const ChannelMembersList = connect(mapStateToProps, mapDispatchToProps)(_ChannelMembersList);
