import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo';
import { withRouter } from 'react-router';
import { AUTH_TOKEN } from '../../constants';

const SIGNUP_MUTATION = gql`
	mutation SignupMutation($email: String!, $password: String!, $name: String!) {
		signup(email: $email, password: $password, name: $name) {
			token
		}
	}
`

const LOGIN_MUTATION = gql`
	mutation LoginMutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
		}
	}
`

const Login = ({ history }) => {

	const [isLogin, setIsLogin] = useState(true);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [signupMutation] = useMutation(SIGNUP_MUTATION, {
		onCompleted: data => confirm(data)
	});
	const [loginMutation] = useMutation(LOGIN_MUTATION, {
		onCompleted: data => confirm(data)
	});

	const handleLoginClick = () => {
		const mutationOptions = {
			variables: {
				name,
				email,
				password
			}
		};

		isLogin ? loginMutation(mutationOptions) : signupMutation(mutationOptions);
	}

	const confirm = data => {
		const { token } = isLogin ? data.login : data.signup;
		saveUserData(token);
		history.push('/');
	}

	const saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  }

	return (
		<div>
			<h4 className="mv3">{isLogin ? 'Login' : 'Sign Up'}</h4>
			<div className="flex flex-column">
				{
					!isLogin &&
					<input
						value={name}
						onChange={e => setName(e.target.value)}
						type="text"
						placeholder="Your name"
					/>
				}
				<input
					value={email}
					onChange={e => setEmail(e.target.value)}
					type="text"
					placeholder="Your email address"
				/>
				<input
					value={password}
					onChange={e => setPassword(e.target.value)}
					type="password"
					placeholder="Choose a safe password"
				/>
			</div>
			<div className="flex mt3">
				<div className="pointer mr2 button" onClick={handleLoginClick}>
					{isLogin ? 'login' : 'create account'}
				</div>
				<div
					className="pointer button"
					onClick={() => setIsLogin(!isLogin)}
				>
					{
						isLogin ?
						'need to create an account?'
						:
						'already have an account?'
					}
				</div>
			</div>
		</div>
	);
}

export default withRouter(Login);