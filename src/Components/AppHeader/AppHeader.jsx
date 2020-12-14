import React, { useState } from 'react';
import './AppHeader.scss';
import Avatar from '@material-ui/core/Avatar';
import { useSelector } from 'react-redux';
import { UserSideSettings } from '../UserSideSettings/UserSideSettings';

export function AppHeader() {
	const loggedUser = useSelector((state) => state.userReducer);
	const [sideSettingIsOpen, setsideSettingIsOpen] = useState(false);
	return (
		<div className='app-header flex-center'>
			<input className='main-search-bar' type='text' placeholder='Search In Parrot...' />
			{loggedUser && (
				<Avatar
					className='avatar'
					variant='square'
					alt={loggedUser.preferences.nickName}
					src={loggedUser.preferences.avatarImg}
					data-name={loggedUser.preferences.nickName}
					onClick={() => setsideSettingIsOpen(!sideSettingIsOpen)}
				/>
			)}
			<span className='profile-tag flex-center'>{loggedUser.preferences.nickName}</span>
			{sideSettingIsOpen && <UserSideSettings close={setsideSettingIsOpen} user={loggedUser} />}
		</div>
	);
}
