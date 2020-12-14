import React, { useEffect, useState } from 'react';
import './UserTypingBox.scss';
import { socketService } from '../../Services/socketService';

export function UserTypingBox() {
	const [currTypingUser, setCurrTypingUser] = useState(null);
	useEffect(() => {
		socketService.on('userIsTyping', ({ userName }) => {
			setCurrTypingUser(userName);
		});
		socketService.on('noTypingInChat', () => {
			setCurrTypingUser(null);
		});
	}, []);
	return <div className='typing-box-indication'>{currTypingUser && <span> {currTypingUser} is Typing...</span>}</div>;
}
