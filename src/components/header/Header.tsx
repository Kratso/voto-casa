import { Icon, Navbar } from '@blueprintjs/core';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header : React.FunctionComponent = ()=>{

	return (
		<div className="header-container">
			<Navbar fixedToTop={true}>
				<Navbar.Group>
					<Navbar.Heading>VotoCasa</Navbar.Heading>
					<Navbar.Divider/>
					<NavLink  to="/" activeClassName="nav-selected"><Icon icon="social-media"/> VOTACIÓN</NavLink>
					<Navbar.Divider/>
					<NavLink  to="/resultados.html" activeClassName="nav-selected"><Icon icon="confirm" /> RESULTADOS</NavLink>
				</Navbar.Group>
			</Navbar>
		</div>
	)
}