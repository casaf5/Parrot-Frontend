import React from 'react';
import './SideChatPinnedItems.scss';
import Avatar from '@material-ui/core/Avatar';
import { toggleMsgPinnedStatus } from '../../Actions/chatMessagesAction';
import { connect } from 'react-redux';

function _SideChatPinnedItems({ items, toggleMsgPinnedStatus }) {
	if (items.length <= 0) {
		return (
			<h4 className="no-pinned-items">
				No items have been pinned yet! Open
				 the context menu on important messages or files and choose Pin to
				this conversation to stick them here.
			</h4>
		);
	}
	return (
		<div className='pinned-items-container'>
			{items.map((item) => {
				return (
					<section className='pinned-item flex col justify-center' key={item.id}>
						<header className='flex'>
							<Avatar className='custom-avatar' src={item.avatarImg} />
							<span>{item.sentBy}</span>
							<i className='fas fa-plus' onClick={() => toggleMsgPinnedStatus(item.id)} />
						</header>
						<section className='item-content'>{item.messageTxt}</section>
						<section className='item-comments flex'>
							<section className='reactions'>
								{Object.keys(item.reactions).slice(0, 2)}
								{Object.keys(item.reactions).length} reactions
							</section>
						</section>
						<section className='item-creation'>
							<span>
								{new Date(item.createdAt).toLocaleDateString()} at{' '}
								{new Date(item.createdAt).toLocaleTimeString()} |
							</span>
							<span>View message</span>
						</section>
					</section>
				);
			})}
		</div>
	);
}

const mapDispatchToProps = {
	toggleMsgPinnedStatus,
};

export const SideChatPinnedItems = connect(null, mapDispatchToProps)(_SideChatPinnedItems);
