import React from 'react';
import './MainAppSideNav.scss';
export function MainAppSideNav() {
	return (
		<div className='main-nav flex col'>
			<i className='fas fa-home'></i>
			<i className='fab fa-rocketchat'></i>
			<i className='fas fa-database'></i>
			<i className='fas fa-sitemap'></i>
			<i className='far fa-address-card'></i>
		</div>
	);
}
