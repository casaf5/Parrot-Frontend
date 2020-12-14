import React, { Component } from 'react';
import './SendMessageBar.scss';
import { sendPublicMessage, sendPrivateMessage, addReplyToMsg } from '../../Actions/chatMessagesAction';
import { TextMsgEditor } from '../TextMsgEditor/TextMsgEditor';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { socketService } from '../../Services/socketService';

export class _SendMessageBar extends Component {
	state = {
		msgToSend: {
			messageTxt: '',
		},
		typingTimer: null,
		// elMsgEditor: React.createRef(),
	};
	handleChange = (messageTxt) => {
		this.emitSocketEvents();
		this.setState((state) => ({ ...state, msgToSend: { messageTxt } }));
		// console.log(target.innerText);
		// const messageTxt = msgTxt;
		// this.state.elMsgEditor.current.rows = target.value ? 1 + Math.floor(target.scrollHeight / 50) : 2;
	};

	onSendMessage = async () => {
		const { chatType } = this.props;
		const { nickName, avatarImg } = this.props.loggedUser.preferences;
		await this.setState((state) => ({
			...state,
			msgToSend: {
				...state.msgToSend,
				id: uuidv4(),
				createdAt: Date.now(),
				sentBy: nickName,
				avatarImg,
				userId: this.props.loggedUser._id,
				isPinned: false,
				reactions: {},
				replies: [],
			},
		}));

		await this.sendMessage(chatType);
		this.setState((state) => ({ ...state, msgToSend: { messageTxt: '' } }));
	};
	sendMessage = async (chatType) => {
		const { _id } = this.props.chatData;
		const { msgToSend } = this.state;
		const { replyMsgId, isPrivate } = this.props;
		if (replyMsgId) await this.props.addReplyToMsg(replyMsgId, msgToSend, isPrivate);
		else if (chatType === 'direct') await this.props.sendPrivateMessage(msgToSend);
		else await this.props.sendPublicMessage(msgToSend);
		let userId = this.props.loggedUser._id;
		socketService.emit('chatUpdated', { chatType, _id, userId });
	};
	emitSocketEvents = () => {
		if (this.state.typingTimer) clearTimeout(this.state.typingTimer);
		const { _id } = this.props.chatData;
		const userName = this.props.loggedUser.preferences.nickName;
		const typingTimer = setTimeout(() => {
			socketService.emit('userStoppedTyping', _id);
		}, 2000);
		this.setState({ typingTimer });
		socketService.emit('chatTyping', { _id, userName });
	};
	render() {
		const { replyMsgId } = this.props;
		return (
			<div className={'message-bar' + (replyMsgId ? '' : ' main-chat')}>
				<TextMsgEditor
					handleChange={this.handleChange}
					sendMessage={this.onSendMessage}
					isReply={this.props.replyMsgId}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loggedUser: state.userReducer,
		chatData: state.chatMessagesReducer,
	};
};

const mapDispatchToProps = {
	sendPublicMessage,
	sendPrivateMessage,
	addReplyToMsg,
};

export const SendMessageBar = connect(mapStateToProps, mapDispatchToProps)(_SendMessageBar);
