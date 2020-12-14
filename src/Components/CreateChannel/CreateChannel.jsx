import React, { useState } from 'react';
import './CreateChannel.scss';
import { addChannelToUser } from '../../Actions/userAction';
import { connect } from 'react-redux';
import { PopupWindow } from '../GeneralStructure/PopupWindow/PopupWindow';

function _CreateChannel({ close, addChannelToUser, userData }) {
	const [channel, setChannel] = useState({
		channelName: '',
		channelDesc: '',
		channelThumbnail:
			'https://d2slcw3kip6qmk.cloudfront.net/marketing/techblog/how-to-plan-a-programming-competition-header@2x.png',
		createdAt: Date.now(),
		createdBy: { ...userData.preferences, _id: userData._id },
		messages: [],
	});

	const handleChange = ({ target }) => {
		const { value } = target;
		setChannel((prevState) => ({ ...prevState, [target.id]: value }));
	};
	const createNewChannel = async () => {
		if (!channel.channelName) return;
		close(false);
		let finalChannel = finalizeChannelCreation(channel);
		addChannelToUser(finalChannel);
	};
	const finalizeChannelCreation = () => {
		const creator = {
			nickName: userData.preferences.nickName,
			avatarImg: userData.preferences.avatarImg,
			_id: userData._id,
		};
		return { ...channel, sharedUsers: [creator] };
	};

	return (
		<div className='create-channel'>
			<PopupWindow close={close} title='Create New Channel' width='500px' height='500px'>
				<p>
					Channels are the place where you can group togther your frindes and share your thoughts with each
					other.. Try to give it a unique name around a topic - #Homework for example..
				</p>
				<label htmlFor='channelName'>Name</label>
				<input
					type='text'
					placeholder='# Channel Name'
					id='channelName'
					onChange={handleChange}
					autoComplete='off'
				/>
				<label htmlFor='channelDesc'>Description (optimal)</label>
				<input type='text' id='channelDesc' onChange={handleChange} />
				<button className={'btn-create' + (channel.channelName ? ' sucsses' : '')} onClick={createNewChannel}>
					Create
				</button>
			</PopupWindow>
			{/* <section className='close-modal-screen' onClick={() => close()} /> */}
		</div>
	);
}
const mapStateToProps = (state) => ({
	userData: state.userReducer,
});

const mapDispatchToProps = {
	addChannelToUser,
};

export const CreateChannel = connect(mapStateToProps, mapDispatchToProps)(_CreateChannel);
