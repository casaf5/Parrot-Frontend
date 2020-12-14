import React from 'react';
import { useState } from 'react';
import './SideChatNavItem.scss';

export function SideChatNavItem({ name, children, counter }) {
	const [itemIsOpen, setItemIsOpen] = useState(false);
	return (
		<div className='chat-nav-item'>
			<header className='header-item-name flex space-between' onClick={() => setItemIsOpen(!itemIsOpen)}>
				<span>{name}</span>
				{counter >= 0 && <span className='item-counter'>{counter}</span>}
				<i className={'fas fa-caret-' + (itemIsOpen ? 'down' : 'right')} />
			</header>
			{itemIsOpen && <section className='item-content'>{children}</section>}
		</div>
	);
}
