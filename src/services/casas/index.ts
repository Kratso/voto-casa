import { createSlice } from '@reduxjs/toolkit'

const casasURL = "https://votocasa-api.herokuapp.com/api/v1/casas/all";



const casasSlice = createSlice({
	name:"casas",
	initialState: {
		casas: []
	},
	reducers: {
		updateCasas: (state, action) =>{
			console.log(action.payload)
			state.casas = action.payload
		}
	},

})

export const getCasas = (state : any) => state.casasReducer.casas;


export const fetchCasas = () => {	
	return async (dispatch: any, getState : any) => {
		await fetch(casasURL)
			.then(res => res.json())
			.then(res => {
				console.log(res)
				dispatch(casasSlice.actions.updateCasas(res))
		})
		
	}
}

export type Casa = {
	nombre: string,
	localizacion: string,
	imagenes: string[],
	precio: number,
	numeroDeHuespedes: number,
	url: string
}

export const { updateCasas } = casasSlice.actions;

export default casasSlice.reducer