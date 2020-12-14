import React, { useContext } from 'react';
import './CreatePrivateMsgChat.scss';
import { PopupWindow } from '../GeneralStructure/PopupWindow/PopupWindow';
import { SelectMembers } from '../SelectMembers/SelectMembers';
import { addPMToUser } from '../../Actions/userAction';
import { connect } from 'react-redux';
import { ChatContext } from '../../ParrotApp';

function _CreatePrivateMsgChat({ close, addPMToUser, userData }) {
	const createdDirectMsgs = userData.directMessages;
	const { updateChatToRender } = useContext(ChatContext);

	const addNewPMChat = async ({ _id, nickName, avatarImg }) => {
		if (!createdDirectMsgs.some((user) => user._id === _id)) {
			const newPMData = { type: 'direct', _id, directMsgName: nickName, avatarImg, messages: [] };
			await addPMToUser(newPMData);
		}
		updateChatToRender({ type: 'direct', _id });
		close(false);
	};

	return (
		<div>
			<PopupWindow close={close} title='Send Direct Message'  width="500px" height="500px">
				<section className='overflow-hidden max-width flex col'>
					<SelectMembers whenClicked={addNewPMChat} />
				</section>
			</PopupWindow>
		</div>
	);
}
const mapStateToProps = (state) => ({
	userData: state.userReducer,
});

const mapDispatchToProps = {
	addPMToUser,
};

export const CreatePrivateMsgChat = connect(mapStateToProps, mapDispatchToProps)(_CreatePrivateMsgChat);
