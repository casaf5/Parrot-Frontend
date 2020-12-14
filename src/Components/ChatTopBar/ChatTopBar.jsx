import React, { useState } from 'react';
import './ChatTopBar.scss';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { AddMemberToChannel } from '../AddMemberToChannel/AddMemberToChannel';
import { ChannelMembersList } from '../ChannelMembersList/ChannelMembersList';

export function ChatTopBar({ name, toggleDetails, channelMembers,toggleNavBar }) {
	const [addMemberWindowState, setAddMemberWindowState] = useState(false);
	const [channelMembersWindow, setChannelMembersWindow] = useState(false);
	return (
		<div className='channel-bar flex'>
			<i className="far fa-newspaper nav-toggle-btn" onClick={()=>toggleNavBar(true)}></i>
			<section className='left-side'>
				<span>
					#{name}
					<i className='far fa-star' />
				</span>
				<span>Add a Topic</span>
			</section>
			<section className='right-side flex'>
				<section className='members-avatars' onClick={() => setChannelMembersWindow(true)}>
					<AvatarGroup max={3} spacing='medium'>
						{channelMembers &&
							channelMembers.map((member) => <Avatar src={member.avatarImg} key={member._id} />)}
					</AvatarGroup>
				</section>
				{channelMembers && <i className='far fa-user-plus' onClick={() => setAddMemberWindowState(true)} />}
				<i className='fal fa-info-circle' onClick={toggleDetails} />
			</section>
			{addMemberWindowState && <AddMemberToChannel toggleState={setAddMemberWindowState} />}
			{channelMembersWindow && <ChannelMembersList close={setChannelMembersWindow} />}
		</div>
	);
}
