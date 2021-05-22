import React, { useState } from 'react';
import { Button, Card, FormGroup, InputGroup, Intent, Label } from '@blueprintjs/core';

type UserData = {
	username: string,
	password: string
}

interface LoginProps {
	login : (username: string, password: string) => void;
}

export const Login : React.FunctionComponent<LoginProps> = (props) => {
	
	let [ userData, changeUserData ] = useState({username:"", password:""} as UserData)

	const onChangeUser = (username: string)=>changeUserData({username, password: userData.password})
	const onChangePass = (password: string)=>changeUserData({username: userData.username, password})

	return (
		<div className="login-container">
			<Card className="login-dialog" elevation={3}>
				<FormGroup>
					<Label className="login-input-label username-input-label">
						Username
						<InputGroup
							intent={Intent.PRIMARY}
							className="login-input username-input"
							leftIcon="user"
							placeholder="username"
							value={userData.username}
							onChange={(e)=>onChangeUser(e.target.value)}
						/>
					</Label>
					<Label  className="login-input-label password-input-label">
						Password
						<InputGroup
							intent={Intent.PRIMARY}
							className="login-input password-input"
							leftIcon="lock"
							value={userData.password}
							onChange={(e)=>onChangePass(e.target.value)}
							type="password"
						/>
					</Label>
					<Button
						className="login-button"
						icon="log-in"
						intent={Intent.PRIMARY}
						onClick={()=>{props.login(userData.username, userData.password)}}
						text="Login"
					/>
				</FormGroup>
			</Card>
		</div>
	)
}