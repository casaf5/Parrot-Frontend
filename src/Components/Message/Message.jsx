import React, { useState } from 'react';
import './Message.scss';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { UserPreviewPopup } from '../UserPreviewPopup/UserPreviewPopup';
import { MessagePopNavActions } from '../MessagePopNavActions/MessagePopNavActions';
import moment from 'moment';
import parse from 'html-react-parser';

export function Message({ msg, isPrivate, replay, isThread, shortNavForm }) {
	const { sentBy, createdAt, messageTxt, avatarImg, userId } = msg;
	const [showUserPopup, setShowUserPopup] = useState(null);
	const [replyIsHoverd, setReplyIsHoverd] = useState(false);
	const [isMsgHovered, setIsMsgHovered] = useState(false);
	const [clickPos, setClickPos] = useState({ x: null, y: null });

	const onNameClicked = (ev) => {
		var { clientX, clientY } = ev;
		if (clientX + 300 > window.innerWidth) clientX = clientY - 300;
		if (clientY + 350 > window.innerHeight) clientY = clientY - 350;
		setClickPos({ x: clientX, y: clientY });
		setShowUserPopup(true);
	};
	const repliesAvatars = () => {
		let includedAvatars = [];
		return msg.replies.reduce((avatars, reply) => {
			if (!includedAvatars.includes(reply.userId)) {
				includedAvatars.push(reply.userId);
				avatars.push(reply);
			}
			return avatars;
		}, []);
	};
	return (
		<div
			className='msg-layout'
			onMouseEnter={() => setIsMsgHovered(true)}
			onMouseLeave={() => setIsMsgHovered(false)}
		>
			<section className='user-avatar flex justify-center'>
				<Avatar className='avatar' src={avatarImg} />
			</section>
			<section className='msg-body'>
				<section className='msg-details'>
					<span className='user-name' onClick={onNameClicked}>
						{sentBy}
					</span>
					{/* <span className='msg-created'>{new Date(createdAt).toLocaleTimeString()}</span> */}
					<span className='msg-created'>{moment(new Date(createdAt)).fromNow()}</span>
				</section>
				<section className='msg-content'>{parse(messageTxt)}</section>
				<section className='msg-reaction-container flex'>
					{Object.entries(msg.reactions).map(([reaction, count]) => {
						return (
							<section className='reaction-item flex' key={reaction}>
								<span>{reaction}</span>
								<span>{count}</span>
							</section>
						);
					})}
				</section>
				{!isThread && msg.replies.length > 0 && (
					<>
						<section className='replies-bar flex align-center' onClick={() => replay(msg.id)}>
							<AvatarGroup max={3} spacing='medium'>
								{repliesAvatars().map((memberReply) => (
									<Avatar className='custom-avatar' src={memberReply.avatarImg} key={memberReply.userId} />
								))}
							</AvatarGroup>
							<section className='reply-title-head'>
								{msg.replies.length === 1 ? '1 reply' : `${msg.replies.length} replies `}
								<span className='on-hover'> View Thread</span>
								<span className='not-hovered'>
									{` Last reply ${moment(new Date(msg.replies.slice(-1)[0].createdAt)).fromNow()}`}
								</span>
							</section>
							<i className='far fa-angle-right' />
						</section>
					</>
				)}
			</section>
			{showUserPopup && <UserPreviewPopup userId={userId} close={setShowUserPopup} clickPos={clickPos} />}
			{isMsgHovered && (
				<MessagePopNavActions msg={msg} isPrivate={isPrivate} replay={replay} shortForm={shortNavForm} />
			)}
		</div>
	);
}
