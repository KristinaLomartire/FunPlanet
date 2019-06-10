import React from 'react';
import { Link } from "react-router-dom";

const Menu = ({ logout, displayName }) => {
	return (
		<nav className="header" role="navigation">
			<ul>
				<li>
					<Link className="start" to="/">
						<i class="fas fa-home" />
						Start
					</Link>
				</li>

				<li>
					<Link className="add" to="/addpost/">
						<i class="fas fa-pencil-alt" />
						Nytt inlägg
					</Link>
				</li>

				<li>
					<Link className="hitta" to="/search/">
						<i class="fas fa-search" />
						Sök
					</Link>
				</li>

				<li>
					<span className="logout" onClick={logout}>
						<i class="fas fa-sign-out-alt" />
						Logout
					</span>
				</li>
			</ul>
		</nav>
	);
}

export default Menu;
