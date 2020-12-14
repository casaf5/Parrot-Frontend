import React, { useContext, useState, useEffect } from 'react';
import './DropDown.scss';
import { useSelector } from 'react-redux';
import { ChatContext } from '../../ParrotApp';

export function DropDown({ items, label, itemIcon, itemName, children, closeNavMobile }) {
	const [openDropDown, setOpenDropDown] = useState(true);
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const { updateChatToRender } = useContext(ChatContext);
	const { onlineUsers } = useSelector((state) => state.workSpaceReducer);
	useEffect(() => {
		//to load the first channel/private when refreshed
		if (items[0] && !items[0].type) updateChatToRender({ _id: items[0]._id });
	}, []);
	const getFormattedData = () => {
		//!think of a better way to implement this!
		if (itemName === 'directMsgName') {
			items = items.map((user) => ({ ...user, isOnline: onlineUsers.includes(user._id) }));
		}
		return items;
	};
	const itemSelect = ({ target }, item) => {
		const dropDownItems = document.querySelectorAll('.drop-item');
		dropDownItems.forEach((item) => item.classList.remove('selected'));
		target.classList.add('selected');
		closeNavMobile(false);
		updateChatToRender(item);
	};
	return (
		<ul className='dropdown-container clean-list'>
			{createModalOpen &&
				React.Children.map(children, (child) => {
					return React.cloneElement(child, { close: setCreateModalOpen });
				})}
			<section className='drop-down-header flex'>
				<i
					id='channel-tag'
					className={'fas fa-caret-right' + (openDropDown ? ' open' : '')}
					onClick={() => setOpenDropDown(!openDropDown)}
				></i>
				<span onClick={() => setOpenDropDown(!openDropDown)} htmlFor='channel-tag'>
					{label}
				</span>
				<i className='fas fa-plus' onClick={() => setCreateModalOpen(true)} />
			</section>
			{openDropDown &&
				onlineUsers &&
				getFormattedData().map((item) => {
					return (
						<li
							className='drop-item'
							key={item._id}
							onClick={(ev) => itemSelect(ev, { type: item.type, _id: item._id })}
						>
							<i className={itemIcon + (item.isOnline ? ' online' : '')}></i>
							{item[itemName]}
						</li>
					);
				})}
		</ul>
	);
}
