import React, { useState } from 'react';
import './MessagePopNavActions.scss';
import { removeMsgFromChat, toggleMsgPinnedStatus, addReactionToMsg } from '../../Actions/chatMessagesAction';
import { ReactionsList } from '../ReactionsList/ReactionsList';
import { connect } from 'react-redux';

function _MessagePopNavActions(props) {
	const [openReactions, setOpenReactions] = useState(false);
	const addReaction = async (reaction) => {
		await props.addReactionToMsg(props.msg.id, reaction, props.isPrivate);
	};
	return (
		!props.shortForm && (
			<div className='msg-pop-nav flex-center'>
				<i className='far fa-icons' onClick={() => setOpenReactions(!openReactions)}></i>
				<i className='fal fa-comment-alt-lines' onClick={() => props.replay(props.msg.id)}></i>
				<i
					className={'fal fa-thumbtack' + (props.msg.isPinned ? ' pinned' : '')}
					onClick={() => props.toggleMsgPinnedStatus(props.msg.id, props.isPrivate)}
				/>
				<i
					className='fas fa-eraser'
					onClick={() => props.removeMsgFromChat(props.msg.id, props.isPrivate)}
				></i>
				{openReactions && <ReactionsList addReaction={addReaction} close={setOpenReactions} />}
			</div>
		)
	);
}

const mapDispatchToProps = {
	toggleMsgPinnedStatus,
	removeMsgFromChat,
	addReactionToMsg,
};

export const MessagePopNavActions = connect(null, mapDispatchToProps)(_MessagePopNavActions);
