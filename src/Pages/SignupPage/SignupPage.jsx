import React, { useState } from 'react';
import './SignupPage.scss';
import { Redirect, Link } from 'react-router-dom';
import { SignupForm } from '../../Components/AuthCmps/SignupForm/SignupForm';
import { motion } from 'framer-motion';
import signupSVG from '../../Assets/Images/signup.svg';

export function SignupPage() {
	const [sucssesSignup, setSucssesSignup] = useState(false);

	return (
		<motion.div
			initial={{ x: '-100vw' }}
			animate={{ x: 0 }}
			transition={{ duration: 0.6, ease: 'easeInOut' }}
		>
			<div className='signup-page'>
				<section className='right-side flex col '>
					<Link to='home'>
						<i className='fas fa-home back-arrow' />
					</Link>
					<SignupForm signupHandler={setSucssesSignup} />
				</section>
				<section className='left-side flex col'>
					<section className='info'>
						<h1>Already a member? </h1>
						<Link to='login'>
							<button>Login</button>
						</Link>
					</section>
					<img className='login-svg' src={signupSVG} alt='' />
				</section>
				{sucssesSignup && <Redirect to='/' />}
			</div>
		</motion.div>
	);
}
