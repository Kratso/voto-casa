import React from 'react';
import { Resultados } from './components/resultados/Resultados';
import { 
    BrowserRouter as Router,
    Switch,
    Route
  } from 'react-router-dom';
import { Login } from './components/login/Login';
import { Votaciones } from './components/votos/Votacion'
import { Header } from './components/header/Header'
import { useDispatch, useSelector } from 'react-redux';
import { canVoteUser, isLoggedIn, login } from './services/usuarios';
import { Casa, fetchCasas, getCasas, updateCasas } from './services/casas';





const _Content : React.FunctionComponent<{casas: Casa[]}> = ({casas}) =>{
	const dispatch = useDispatch();
	if(casas.length === 0) dispatch(fetchCasas());
	const _updateCasas = (casas : Casa[]) =>{ 
		console.log(casas)
		dispatch(updateCasas(casas))
	}
	const isLogged = useSelector(isLoggedIn)
	const canVote = useSelector(canVoteUser)
	const loginAction = (username: string, password: string) => dispatch(login(username, password))
	return (
		<Router>
			{isLogged?<Header/>:null}
			<Switch>
				<Route path="/resultados.html">
				{
					isLogged
					? <Resultados/>
					: <Login login={loginAction} />
				}
				</Route>
				<Route exact path="/">
				{
					isLogged 
					? <Votaciones 
						canVote={canVote}
						casas={casas as any}
						updateCasas={(casas)=>_updateCasas(casas)}
					/>
					: <Login login={loginAction} />
				}
				</Route>            
			</Switch>
        </Router>
	)
}

const Content = React.memo(_Content, (pre, act)=>pre.casas.length == act.casas.length);


const MainContent = ()=>{
	
	const casas = useSelector(getCasas);

	return <Content  casas={casas}/>
}

export default MainContent;