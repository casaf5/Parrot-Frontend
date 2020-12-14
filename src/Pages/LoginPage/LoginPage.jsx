import React, { useState } from 'react';
import './LoginPage.scss';
import { Redirect, Link } from 'react-router-dom';
import { LoginForm } from '../../Components/AuthCmps/LoginForm/LoginForm';
import { SignupForm } from '../../Components/AuthCmps/SignupForm/SignupForm';
import { motion } from 'framer-motion';
import loginAuthSVG from '../../Assets/Images/login-auth.svg';

export function LoginPage() {
	const [showSignUpForm, setShowSignUpForm] = useState(false);
	const [sucssesLogin, setSucssesLogin] = useState(false);

	return (
		<motion.div initial={{ x: '100vw' }} animate={{ x: 0 }} transition={{ duration: 0.6, ease: 'easeInOut' }}>
			<div className='login-page'>
				<section className='left-side flex col'>
					<section className='info'>
						<h1>Welcome!</h1>
						<h2>Not registered yet? </h2>
						<Link to='signup'>
							<button>Signup Now</button>
						</Link>
					</section>
					<img className='login-svg' src={loginAuthSVG} alt='' />
				</section>
				<section className='right-side flex col '>
					<Link to='home'>
						<i className='fas fa-home back-arrow' />
					</Link>
					<LoginForm loginHandler={setSucssesLogin} />
				</section>
				{sucssesLogin && <Redirect to='/' />}
			</div>
		</motion.div>
	);
}
