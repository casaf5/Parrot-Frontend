import React, { useState } from 'react';
import './SignupForm.scss';
import { connect } from 'react-redux';
import { addNewUser } from '../../../Actions/userAction';

function _SignupForm({ addNewUser,signupHandler }) {
	const [signupSucsses, setSignupSucsses] = useState(false);
	const [newUser, setNewUser] = useState({
		email: '',
		password: '',
		verifyPassword: '',
	});
	const [errorInfo, setErrorInfo] = useState({
		email: '',
		password: '',
		verifyPassword: '',
	});

	const handleChange = ({ target }) => {
		const toValue = target.id;
		setNewUser((state) => ({ ...state, [toValue]: target.value }));
	};

	const signup = async () => {
		if (newUser.password !== newUser.verifyPassword) {
			setErrorInfo((state) => ({ ...state, verifyPassword: 'passwords dont match' }));
			return
		}
		const { email, password } = newUser;
		const status = await addNewUser({ email, password });
		if (status.err) {
			setErrorInfo((state) => ({ ...state, email: status.err }));
			return;
		}
		signupHandler(true);
	};

	return (
		<section className='right-side-signup flex col'>
			<section className='signup-form flex col'>
				<h3 className='form-title'>Sign Up</h3>
				<label className='flex align-center'>
					<i className='form-icon fas fa-at' />
					<input id='email' type='text' placeholder='Email' onChange={handleChange} value={newUser.email} />
					<h6 className='err-label'>{errorInfo.email}</h6>
				</label>
				<label className='flex align-center'>
					<i className='form-icon fas fa-lock' />
					<input
						id='password'
						type='password'
						placeholder='Password'
						onChange={handleChange}
						value={newUser.password}
					/>
					<h6 className='err-label'>{errorInfo.password}</h6>
				</label>
				<label className='flex align-center'>
					<i className='form-icon fas fa-lock' />
					<input
						id='verifyPassword'
						type='password'
						placeholder='Repeat password'
						onChange={handleChange}
						value={newUser.verifyPassword}
					/>
					<h6 className='err-label'>{errorInfo.verifyPassword}</h6>
				</label>
				<button onClick={signup} className='signup-btn'>
					Sign up
				</button>
			</section>
		</section>
	);
}

const mapDispatchToProps = {
	addNewUser,
};

export const SignupForm = connect(null, mapDispatchToProps)(_SignupForm);
