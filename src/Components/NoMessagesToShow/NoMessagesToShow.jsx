import React from 'react';
import './NoMessagesToShow.scss';

export function NoMessagesToShow() {
	return (
		<div className='no-msg-container flex col '>
			<i className='far fa-comments' />
			<p>Seems people are shy to start the chat..</p>
			<p>Break the ice send the first message!</p>
		</div>
	);
}
