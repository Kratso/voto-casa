import { Intent } from '@blueprintjs/core';
import { createSlice } from '@reduxjs/toolkit'
import { Casa } from '../casas';
import { AppToaster } from '../helpers/helpers';
import { vote } from '../usuarios';

const postVotosURL = 'https://votocasa-api.herokuapp.com/api/v1/votos/post';
const fetchGanadorURL = 'https://votocasa-api.herokuapp.com/api/v1/votos/getGanador';

const votosSlice = createSlice({
	name: 'votos',
	initialState: {
		ganador: {
			nombre: '',
			localizacion: '',
			imagenes: [],
			precio: 0,
			numeroDeHuespedes: 0,
		},
		votos: 0
	},
	reducers: {
		updateGanador: (state, action) => {
			state.ganador = action.payload.ganador;
			state.votos = action.payload.votos;
 		}
	}
})

export const getGanador = (state: any) => state.votosReducer.ganador;
export const getVotos = (state : any) => state.votosReducer.votos;

export const fetchGanador = () => {
	return async (dispatch: any, getState:any) => {
		await fetch(fetchGanadorURL)
			.then(res=>res.json())
			.then(res=>{
				if(res.ganador !== null) {
					dispatch(updateGanador({
						ganador: res.ganador[0],
						votos: res.puntuacion
					}))
				}
				
			})
	}
}

export const postVoto = (casas: Casa[]) => {
	return async (dispatch: any, getState: any) => {
		const data = JSON.stringify({
			casas: casas,
			user: getState().usuariosReducer.username
		});
		try {
			await fetch(postVotosURL, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: data
			})
			.then(res => {
				if(res.status && res.status !== 200) {
					AppToaster.show({
						message: "An error has occured: " + res.status + "\t" + res.statusText,
						 intent: Intent.DANGER 
					})
				} else {
					dispatch(vote({}))
				}
			})
		} catch {
			AppToaster.show({
				message: "An error has occured",
				 intent: Intent.DANGER 
			})
		}
		
	}
}


export const { updateGanador } = votosSlice.actions

export default votosSlice.reducer