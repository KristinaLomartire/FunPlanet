import React from 'react';
import { Link } from "react-router-dom";

const Menu = ({ logout, displayName }) => {
	return (
		<nav className="header" role="navigation">

			<div className="hamburger">
				<div className="hamburgerContainer">
					<span className="line"></span>  <br />
					<span className="line"></span>  <br />
					<span className="sist" ></span>
				</div>
			</div>
			<ul>
				<li>
					<Link className="start" to="/">Start</Link>
				</li><br />

				<li>
					<Link className="add" to="/addpost/">Lägg till ny inlägg</Link>
				</li><br />
				<li>
					<Link className="hitta" to="/search/">Hitta inlägg</Link>
				</li>
				<li className="name">
					Välkommen  {displayName}
				</li>
				<li>
					<button className="logout" onClick={logout}>Logout</button>
				</li>
			</ul>
		</nav>
	);
}

export default Menu;
