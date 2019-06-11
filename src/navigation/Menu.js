import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = ({ logout }) => {
	return (
		<nav className="header" role="navigation">
			<ul>
				<li>
					<NavLink to="/" className="start" exact>
						<i className="fas fa-home" />
						Start
					</NavLink>
				</li>
				<li>
					<NavLink to="/write/" className="add" >
						<i className="fas fa-pencil-alt" />
						Nytt inlägg
					</NavLink>
				</li>
				<li>
					<NavLink to="#" className="PM" style={{ 'color': '#f1f1f1', 'filter': 'blur(1px)' }} >
						<i className="fas fa-envelope" />
						<strike>Meddelande</strike>
					</NavLink>
				</li>
				<li>
					<NavLink to="/search/" className="search" >
						<i className="fas fa-search" />
						Sök
					</NavLink>
				</li>
				<li>
					<span onClick={logout} className="logout" >
						<i className="fas fa-sign-out-alt" />
						Logout
					</span>
				</li>
			</ul>
		</nav >
	);
}

export default Menu;
