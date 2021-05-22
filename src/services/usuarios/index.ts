import { Intent } from '@blueprintjs/core';
import { createSlice } from '@reduxjs/toolkit'
import { AppToaster } from '../helpers/helpers';

const loginURL = "https://votocasa-api.herokuapp.com/api/v1/users/login"//"https://votocasa-api.herokuapp.com/api/v1/users/login";



const usuariosSlice = createSlice({
	name: "usuarios",
	initialState: {
		username: "",
		isLoggedIn: false,
		canVote: true
	},
	reducers: {
		logIn : (state, action) => {
			state.isLoggedIn = action.payload.isLoggedIn
			state.canVote = action.payload.canVote
			state.username = action.payload.username
		},
		logOut: (state, action) => {
			state.isLoggedIn = false
			state.username =  ""
		},
		vote: (state, action) => {
			state.canVote = false
		}
	}
})

export const isLoggedIn = (state : any) => state.usuariosReducer.isLoggedIn;
export const canVoteUser = (state : any) => state.usuariosReducer.canVote;

export const login = (username : string, password : string) => {
	const data = {
		user: username,
		password: password
	}

	return async (dispatch : any, getState : any) => {
		const stringed = JSON.stringify(data)
		await fetch(loginURL, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: stringed
		})
		.then(res=>res.json())
		.then(res => {
			if(res.code && res.code !== 200) {
				
				AppToaster.show({
					message: "An error has occured: " + res.code + "\t" + res.response.message,
					 intent: Intent.DANGER 
				})

			} else {
				dispatch(usuariosSlice.actions.logIn({username: res.username, isLoggedIn: true ,canVote: res.canVote}))
			}
		}).catch(error => {
			AppToaster.show({message: "An error has occured: " + error, intent: Intent.DANGER })
		})

	}
}


export const { logIn, logOut, vote } = usuariosSlice.actions;

export default usuariosSlice.reducer;
