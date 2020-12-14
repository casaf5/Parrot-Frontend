import React, { useState } from 'react';
import './LoginForm.scss';
import { checkCredentials } from '../../../Actions/userAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function _LoginForm({ loginHandler, checkCredentials }) {
	const [credentials, setCredentials] = useState({
		email: 'ravit@gmail.com',
		password: '1234',
	});
	const handleChange = ({ target }) => {
		const toValue = target.id;
		setCredentials((state) => ({ ...state, [toValue]: target.value }));
	};

	const login = async () => {
		const userData = await checkCredentials(credentials);
		console.log(userData);
		if (userData) loginHandler(true);
	};

	return (
		<div className='right-side-login flex col'>
			<section className='login-form flex col'>
				<h3 className='form-title'>Login</h3>
				<label className='flex align-center'>
					<i className='form-icon fas fa-at' />
					<input
						id='email'
						type='text'
						placeholder='Email'
						onChange={handleChange}
						value={credentials.email}
					/>
				</label>
				<label className='flex align-center'>
					<i className='form-icon fas fa-lock' />
					<input
						id='password'
						type='password'
						placeholder='Password'
						onChange={handleChange}
						value={credentials.password}
					/>
				</label>
				<button onClick={login} className='login-btn'>
					Login
				</button>
			</section>
		</div>
	);
}

const mapDispatchToProps = {
	checkCredentials,
};

export const LoginForm = connect(null, mapDispatchToProps)(_LoginForm);
