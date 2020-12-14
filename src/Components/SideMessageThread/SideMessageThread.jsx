import React, { useEffect, useState } from 'react';
import './SideMessageThread.scss';
import { Message } from '../Message/Message';
import { SendMessageBar } from '../SendMessageBar/SendMessageBar';
import { useSelector } from 'react-redux';

export function SideMessageThread({ msgId, closeThread, chatType, name }) {
	const [isPrivate, setIsPrivate] = useState(false);
	const msg = useSelector((state) => {
		return state.chatMessagesReducer.messages.find((msg) => msg.id === msgId);
	});
	useEffect(() => {
		if (msg.type === 'direct') setIsPrivate(true);
	}, [msg]);

	return (
		msg && (
			<div className='side-messege-thread'>
				<header className='thread-header flex space-between'>
					<section className='side-nav-chatname flex col'>
						<span className='header-main-title bold'>Thread</span>
						<span className='header-sub-title'>{name}</span>
					</section>
					<i className='fas fa-plus' onClick={() => closeThread(null)} />
				</header>
				<div className='replies-container flex col'>
					<section className='replyed-msg'>
						<Message msg={msg} isThread='true' shortNavForm='true' />
					</section>
					{msg.replies.length > 0 && (
						<>
							<div className='replies-bar-wrapper flex'>
								<h6>{msg.replies.length === 1 ? '1 reply' : `${msg.replies.length} replies`}</h6>
								<span className='divider'></span>
							</div>
							<section className='replies'>
								{msg.replies.map((reply) => {
									return <Message msg={reply} key={reply.id} shortNavForm='true' />;
								})}
							</section>
						</>
					)}
					<SendMessageBar replyMsgId={msg.id} isPrivate={isPrivate} chatType={chatType} />
				</div>
			</div>
		)
	);
}
