import React from 'react';
import './ChatFirstMsg.scss';
import Avatar from '@material-ui/core/Avatar';

export function ChatFirstMsg({ type, data }) {
	const name = type === 'channel' ? data.channelName : data.directMsgName;
	return (
		<div className='first-msg-container'>
			<section className='info flex align-center'>
				{type === 'channel' ? (
					<img className='channel-pic' src={data.channelThumbnail} />
				) : (
					<Avatar className='custom-avatar' variant='square' src={data.avatarImg} />
				)}
				<span>{name}</span>
			</section>
			<section className='msg-txt'>
				This is the very beginning of your direct message history with
				<span> @{name}</span>
			</section>
		</div>
	);
}
