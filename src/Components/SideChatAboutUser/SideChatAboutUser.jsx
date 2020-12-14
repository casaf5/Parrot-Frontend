import React from 'react';
import './SideChatAboutUser.scss';

export function SideChatAboutUser({ chatData }) {
	console.log(chatData);
	return (
		<div className='about-chat'>
			<section className='sub-item  '>
				<span className='title'>Display Name</span>
				<span>{chatData.directMsgName}</span>
			</section>
			<section className='sub-item '>
				<span className='title'>Local Time</span>
				<span>{new Date().toLocaleTimeString()}</span>
			</section>
		</div>
	);
}
