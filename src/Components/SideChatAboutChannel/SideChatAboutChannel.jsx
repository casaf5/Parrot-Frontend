import React from 'react';
import './SideChatAboutChannel.scss';
import Avatar from '@material-ui/core/Avatar';

export function SideChatAboutChannel({ chatData }) {
	return (
		chatData && (
			<div className='about-chat'>
				<section className='sub-item'>
					<span className='title'>Topic</span>
					<span>this chat topic is...</span>
				</section>
				<section className='sub-item'>
					<span className='title'>Description</span>
					<span>{chatData.channelDesc}</span>
				</section>
				<section className='sub-item'>
					<span className='title'>Created by</span>
					<span className='created flex align-center'>
						<Avatar variant='square' src={chatData.createdBy.avatarImg} />
						{chatData.createdBy.nickName + ', at ' + new Date(chatData.createdAt).toLocaleDateString()}
					</span>
				</section>
			</div>
		)
	);
}
