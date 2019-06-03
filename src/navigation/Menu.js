import React from 'react';
import { Link } from "react-router-dom";

const Menu = ({logout, displayName}) => {
	return (
		<nav className="header" role="navigation">
		
			<div className="hamburger">
				<div className="hamburgerContainer">
					<span className="line"></span>  <br/>
					<span className="line"></span>  <br/>
					<span className="line"></span>  
			   </div>
			</div>
			<ul>
				<li>
					<Link className="start"to="/">Start</Link>
				</li><br/>
				<li>
					<Link className="tempo"to="/temp/">Temp</Link>
				</li><br/>
				<li>
					<Link className="add" to="/addpost/">Add new Post</Link>
				</li><br/>
				<li>
					<div className="name">{displayName} </div>
					<button className="logout"onClick={logout}>Logout</button>
				</li>
			
			</ul>
		</nav>
	);
}

export default Menu;
  