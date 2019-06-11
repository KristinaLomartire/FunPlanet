import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ logout, displayName }) => {
	return (
		<nav className="header" role="navigation">
			<ul>
				<li>
					<Link className="start" to="/">
						<i className="fas fa-home" />
						Start
					</Link>
				</li>
				<li>
					<Link className="add" to="/write/">
						<i className="fas fa-pencil-alt" />
						Nytt inlägg
					</Link>
				</li>
				<li>
					<Link className="hitta" to="#">
						<i className="fas fa-envelope" />
						Meddelande
					</Link>
				</li>
				<li>
					<Link className="hitta" to="/search/">
						<i className="fas fa-search" />
						Sök
					</Link>
				</li>
				<li>
					<span className="logout" onClick={logout}>
						<i className="fas fa-sign-out-alt" />
						Logout
					</span>
				</li>
			</ul>
		</nav>
	);
}

export default Menu;
