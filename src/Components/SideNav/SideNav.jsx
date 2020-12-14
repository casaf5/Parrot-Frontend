import React, { useContext } from 'react';
import './SideNav.scss';
import { DropDown } from '../DropDown/DropDown';
import { CreateChannel } from '../CreateChannel/CreateChannel';
import { CreatePrivateMsgChat } from '../CreatePrivateMsgChat/CreatePrivateMsgChat';
import { connect } from 'react-redux';
import {ChatContext} from '../../ParrotApp'

function _SideNav({ userData, workSpace, isOpenOnMobile }) {
	const { setOpenSideNavOnMobile } = useContext(ChatContext);
	return (
		<div className={'side-nav flex col' + (isOpenOnMobile ? ' open' : '')}>
			<section className='workspace-name flex'>
				<span>{workSpace.name}</span>
				<i className='far fa-edit'></i>
			</section>
			{userData && (
				<DropDown
					items={userData.channels}
					label='Channels'
					itemIcon='fab fa-slack-hash'
					itemName='channelName'
					closeNavMobile={setOpenSideNavOnMobile}
				>
					<CreateChannel />
				</DropDown>
			)}
			{userData && (
				<DropDown
					items={userData.directMessages}
					label='Direct Messages'
					itemIcon='far fa-circle'
					itemName='directMsgName'
					closeNavMobile={setOpenSideNavOnMobile}
				>
					<CreatePrivateMsgChat />
				</DropDown>
			)}
		</div>
	);
}

const mapStateToProps = (state) => ({
	userData: state.userReducer,
});

export const SideNav = connect(mapStateToProps, null)(_SideNav);
