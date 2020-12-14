import React, { useState } from 'react';
import './SelectMembers.scss';
import { useSelector } from 'react-redux';
import { InputBox } from '../GeneralStructure/InputBox/InputBox';
import Avatar from '@material-ui/core/Avatar';

export function SelectMembers({ whenClicked, customStyle, showJoinStatus }) {
	var { sharedUsers } = useSelector((state) => state.workSpaceReducer); //FOR THE GENERAL MEMBERS OF THE WORKSPACE
	const [filterBy, setFilterBy] = useState('');
	const chatMembers = useSelector((state) =>
		showJoinStatus ? state.chatMessagesReducer.sharedUsers : state.userReducer.directMessages
	);
	const loggedUserId = useSelector((state) => state.userReducer._id);

	// const usersDataWithStatus =
	// sharedUsers.map((wpSharedUser) => {
	// 	let joinedMembersIds = chatMembers.map((user) => user._id);
	// 	if (wpSharedUser._id !== loggedUserId) {
	// 		wpSharedUser.isJoined = joinedMembersIds.includes(wpSharedUser._id);
	// 	}
	// 	return wpSharedUser;
	// })
	const filteredUsers = () => {
		sharedUsers.forEach((user) => {
			user.isJoined = chatMembers.some((chatMember) => chatMember._id === user._id);
		});

		return sharedUsers.filter((member) => {
			return member.nickName.toLowerCase().includes(filterBy.toLowerCase()) && member._id !== loggedUserId;
		});
	};
	const handleChange = (value) => {
		setFilterBy(value);
	};
	return (
		<div className='select-members-container flex col'>
			<InputBox placeholder='Search In Members' handler={handleChange} value={filterBy} />
			<div className={customStyle ? customStyle : 'user-container-default'}>
				{sharedUsers &&
					filteredUsers().map((user) => (
						<section
							className={'user-preview flex' + (user.isJoined ? ' disable' : '')}
							key={user._id}
							onClick={() => whenClicked(user)}
						>
							<Avatar variant='square' src={user.avatarImg} />
							<span>{user.nickName}</span>
							{showJoinStatus && (
								<span className='user-status'>{user.isJoined ? 'Already in this channel' : ''}</span>
							)}
						</section>
					))}
			</div>
		</div>
	);
}
