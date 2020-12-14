import React from 'react';
import './PopupWindow.scss';
export function PopupWindow({ children, close, title, width, height }) {
	return (
		<div className='popup-window'>
			<section className='close-modal-screen' onClick={() => close(false)} />
			<section className='popup-box flex col' style={{ '--width': width, '--height': height }}>
				<header className='flex space-between align-center'>
					<h2>{title}</h2>
					<i className='far fa-times-circle' onClick={() => close(false)}></i>
				</header>
				{children}
			</section>
		</div>
	);
}
