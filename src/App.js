import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { LoginPage } from './Pages/LoginPage/LoginPage';
import { SignupPage } from './Pages/SignupPage/SignupPage';
import { NotFoundPage } from './Pages/NotFoundPage/NotFoundPage';
import { Home } from './Pages/Home/Home';
import ParrotApp from './ParrotApp';
import { AnimatePresence } from 'framer-motion';

export const App = () => {
	return (
		<Router>
			<AnimatePresence>
				<Switch>
					<Route exact path='/home' component={Home} />
					<Route exact path='/' component={ParrotApp} />
					<Route exact path='/login' component={LoginPage} />
					<Route exact path='/signup' component={SignupPage} />
					<Route path='/404' component={NotFoundPage} />
					<Redirect to='/404' />
				</Switch>
			</AnimatePresence>
		</Router>
	);
};
