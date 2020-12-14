import React from 'react';
import { PopupWindow } from '../GeneralStructure/PopupWindow/PopupWindow';
import { SelectMembers } from '../SelectMembers/SelectMembers';
import { connect } from 'react-redux';
import { addNewMembers } from '../../Actions/chatMessagesAction';
import { socketService } from '../../Services/socketService';
function _AddMemberToChannel({ toggleState, addNewMembers, chatData }) {
	const addUserToChannel = async (user) => {
		const { _id, channelName } = chatData;
		socketService.emit('addUserToChannel', { channel: { _id, channelName }, userId: user._id });
		addNewMembers(user);
	};
	return (
		<PopupWindow close={toggleState} width='550px' height='300px' title='Add Member To Channel'>
			<section className='max-width flex col'>
				<SelectMembers
					customStyle='user-container-custom'
					showJoinStatus={true}
					whenClicked={addUserToChannel}
				/>
			</section>
		</PopupWindow>
	);
}

const mapStateToProps = (state) => ({
	chatData: state.chatMessagesReducer,
});

const mapDispatchToProps = {
	addNewMembers,
};

export const AddMemberToChannel = connect(mapStateToProps, mapDispatchToProps)(_AddMemberToChannel);
