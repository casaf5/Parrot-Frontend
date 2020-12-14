import React, { useState } from 'react';
import './UserSideSettings.scss';
import { PopupWindow } from '../GeneralStructure/PopupWindow/PopupWindow';
import { updateUser } from '../../Actions/userAction';
import { updateWorkspaceUserData } from '../../Actions/workSpaceAction';
import { connect } from 'react-redux';

function _UserSideSettings({ close, user, updateUser, userUpdateInWP }) {
	const [currUser, setCurrUser] = useState(user);
	const handleChange = ({ target }) => {
		setCurrUser((state) => ({ ...state, preferences: { ...state.preferences, [target.id]: target.value } }));
	};
	const updateSettings = async () => {
		const { nickName, avatarImg } = currUser.preferences;
		await updateUser(currUser);
		await userUpdateInWP({ _id: currUser._id, nickName, avatarImg });
		close(false);
	};
	return (
		<PopupWindow close={close} title='Your Settings' width='550px' height='450px'>
			<div className='user-settings'>
				<section className='user-data-inputs'>
					<input type='text' placeholder='Full Name' />
					<input
						id='nickName'
						type='text'
						placeholder='Nickname '
						value={currUser.preferences.nickName}
						onChange={handleChange}
					/>
					<input type='text' placeholder='What i do' />
					<input
						id='avatarImg'
						type='text'
						placeholder='Profile image url'
						value={currUser.preferences.avatarImg}
						onChange={handleChange}
					/>
				</section>
				<img src={currUser.preferences.avatarImg} alt='Profile pic' />
			</div>
			<button className='btn-save' onClick={updateSettings}>
				Save
			</button>
		</PopupWindow>
	);
}

const mapDispatchToProps = {
	updateUser,
	userUpdateInWP: updateWorkspaceUserData,
};

export const UserSideSettings = connect(null, mapDispatchToProps)(_UserSideSettings);
