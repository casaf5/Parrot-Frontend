import React from 'react';
import './InputBox.scss';

export function InputBox({ placeholder, handler, value, height, width }) {
	return (
		<div className='input-box'>
			<input
				type='text'
				placeholder={placeholder}
				value={value}
				onChange={(ev) => handler(ev.target.value)}
				style={{ width, height }}
			/>
		</div>
	);
}
