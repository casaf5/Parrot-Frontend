import React, { useRef, useState } from 'react';
import './TextMsgEditor.scss';
import { ReactionsList } from '../ReactionsList/ReactionsList';

export function TextMsgEditor({ handleChange, sendMessage, isReply }) {
	const elTxtEditor = useRef(null);
	const [reactionsPanelIsOpen, setReactionsPanelIsOpen] = useState(false);
	const [cursorLocation, setCursorLocation] = useState(0);
	const onSendMessage = async (ev) => {
		if (
			ev.type !== 'click' &&
			(ev.key !== 'Enter' || (ev.key === 'Enter' && ev.shiftKey) || !elTxtEditor.current.innerText)
		)
			return;
		await sendMessage();
		elTxtEditor.current.innerText = '';
	};
	const formatData = () => {
		let txt = elTxtEditor.current.innerText;
		txt = txt.replace(/\n+/g, '<br>');
		handleChange(txt);
	};
	const addReaction = (emoji) => {
		const { innerText: txt } = elTxtEditor.current;
		elTxtEditor.current.innerText = txt.substring(0, cursorLocation) + emoji + txt.substring(cursorLocation);
		handleChange(elTxtEditor.current.innerText);
	};
	return (
		<div className='editor-wrapper'>
			<div
				className='editable-text'
				onInput={formatData}
				onKeyPress={onSendMessage}
				onKeyDown={() => setCursorLocation(document.getSelection().anchorOffset)}
				onSelect={() => setCursorLocation(document.getSelection().anchorOffset)}
				ref={elTxtEditor}
				contentEditable='true'
				data-placeholder={isReply ? 'Replay...' : 'Send New Message'}
			></div>
			<section className='new-msg-actions flex'>
				<i className='far fa-laugh-wink' onClick={() => setReactionsPanelIsOpen(!reactionsPanelIsOpen)} />
				<i className='fas fa-paperclip' />
				<i className='far fa-paper-plane' onClick={onSendMessage} />
				{reactionsPanelIsOpen && <ReactionsList addReaction={addReaction} close={setReactionsPanelIsOpen} />}
			</section>
		</div>
	);
}
