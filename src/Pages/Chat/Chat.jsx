import React, { useEffect, useState, useRef, useContext } from 'react';
import './Chat.scss';
import { Message } from '../../Components/Message/Message';
import { SendMessageBar } from '../../Components/SendMessageBar/SendMessageBar';
import { ChatTopBar } from '../../Components/ChatTopBar/ChatTopBar';
import { UserTypingBox } from '../../Components/UserTypingBox/UserTypingBox';
import { ChatSideNav } from '../../Components/ChatSideNav/ChatSideNav';
import { ChatFirstMsg } from '../../Components/ChatFirstMsg/ChatFirstMsg';
import { UserFullProfileSideMenu } from '../../Components/UserFullProfileSideMenu/UserFullProfileSideMenu';
import { SideMessageThread } from '../../Components/SideMessageThread/SideMessageThread';
import { useSelector } from 'react-redux';
import { ChatContext } from '../../ParrotApp';
export const FullProfileContext = React.createContext(null);

export function Chat({ navIsOpen }) {
	const messagesContainerEl = useRef(null);
	const chatData = useSelector((state) => state.chatMessagesReducer);
	const [chatType, setChatType] = useState(null);
	const [detailsSideNavOpen, setDetailsSideNavOpen] = useState(false);
	const [sideThreadMsg, setSideThreadMsg] = useState(null);
	const [fullProfileToShow, setFullProfile] = useState(null);
	const { setOpenSideNavOnMobile } = useContext(ChatContext);

	useEffect(() => {
		setTimeout(setContainerScroll, 100); //TODO BETTER WAY?
		let type = chatData && chatData.channelName ? 'channel' : 'direct';
		setChatType(type);
	}, [chatData]);

	const setContainerScroll = () => {
		if (!messagesContainerEl.current) return;
		messagesContainerEl.current.scrollTop = messagesContainerEl.current.scrollHeight;
	};

	const toggleDetailsNav = () => {
		setDetailsSideNavOpen(!detailsSideNavOpen);
		if (!detailsSideNavOpen) setFullProfile(null);
	};
	return (
		chatData && (
			<FullProfileContext.Provider value={setFullProfile}>
				<div
					className={
						'main-view' + (detailsSideNavOpen || fullProfileToShow || sideThreadMsg ? ' side-nav-open' : '')
					}
				>
					{navIsOpen && <section className='close-mobile' onClick={() => setOpenSideNavOnMobile(false)} />}

					<ChatTopBar
						name={chatData.channelName || chatData.directMsgName}
						toggleDetails={toggleDetailsNav}
						channelMembers={chatData.sharedUsers}
						toggleNavBar={setOpenSideNavOnMobile}
					/>
					<section ref={messagesContainerEl} className='messages-container'>
						<ChatFirstMsg data={chatData} type={chatType} />
						{/* {chatData.messages.length <= 0 && <NoMessagesToShow />} */}
						{chatData.messages.map((msg) => (
							<Message key={msg.id} msg={msg} isPrivate={chatType === 'direct'} replay={setSideThreadMsg} />
						))}
					</section>
					{detailsSideNavOpen && (
						<ChatSideNav
							closeSideNav={toggleDetailsNav}
							chatName={chatData.channelName || chatData.directMsgName}
							chatType={chatType}
							chatData={chatData}
						/>
					)}
					{fullProfileToShow && (
						<UserFullProfileSideMenu userToShow={fullProfileToShow} closeProfile={setFullProfile} />
					)}
					{sideThreadMsg && (
						<SideMessageThread
							msgId={sideThreadMsg}
							closeThread={setSideThreadMsg}
							chatType={chatType}
							name={chatData.channelName || chatData.directMsgName}
						/>
					)}
					<SendMessageBar chatType={chatType} />
					<UserTypingBox />
				</div>
			</FullProfileContext.Provider>
		)
	);
}
