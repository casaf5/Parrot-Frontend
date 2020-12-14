import React, { useState } from 'react';
import './SideChatMembersList.scss';
import Avatar from '@material-ui/core/Avatar';
import { useSelector } from 'react-redux';
import { UserPreviewPopup } from '../UserPreviewPopup/UserPreviewPopup';

export function SideChatMembersList() {
	const { sharedUsers } = useSelector((state) => state.chatMessagesReducer);
	const [clickedUser, setClickedUser] = useState(null);
	const [clickPos, setClickPos] = useState({ x: null, y: null });

	const onNameClicked = (ev, userId) => {
		var { clientX, clientY } = ev;
		if (clientX + 300 > window.innerWidth) clientX = clientY - 300;
		if (clientY + 350 > window.innerHeight) clientY = clientY - 350;
		setClickPos({ x: clientX, y: clientY });
		setClickedUser(userId);
	};

	return (
		<div className='members-list flex col'>
			<ul className='members-container clean-list'>
				{sharedUsers &&
					sharedUsers.map((member) => {
						return (
							<li
								key={member._id}
								className='flex align-center'
								onClick={(ev) => onNameClicked(ev, member._id)}
							>
								<Avatar variant='square' src={member.avatarImg} />
								<span>{member.nickName}</span>
							</li>
						);
					})}
			</ul>
			{clickedUser && <UserPreviewPopup userId={clickedUser} close={setClickedUser} clickPos={clickPos} />}
		</div>
	);
}
