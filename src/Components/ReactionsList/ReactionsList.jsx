import React, { useEffect, useRef } from 'react';
import './ReactionsList.scss';
import emojis from 'emojis-list';

export function ReactionsList({ addReaction, close }) {
	const elReactions = useRef(null);
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});
	const handleClickOutside = (ev) => {
		console.log("hi")
		if (elReactions.current && !elReactions.current.contains(ev.target)) {
			close(false);
		}
	};
	return (
		<div className='reactions-wrapper flex col space-between' ref={elReactions}>
			<input className='search-input' type='text' placeholder='Search' autoFocus />
			<section className='reactions-container'>
				{emojis.map((emoji, idx) => (
					<span key={idx} onClick={() => addReaction(emoji)}>
						{emoji}
					</span>
				))}
			</section>
		</div>
	);
}
