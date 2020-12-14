import React from 'react';
import './LoadingScreen.scss';
import { CircularProgress } from '@material-ui/core';

export function LoadingScreen() {
	return (
		<div className="loading-screen">
			<CircularProgress/>
		</div>
	);
}
