import React from 'react';
import { Link } from "react-router-dom";

const Menu = ({logout, displayName}) => {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Start</Link>
				</li>
				<li>
					<Link to="/temp/">Temp</Link>
				</li>
				<li>
					<Link to="/addpost/">Add new Post</Link>
				</li>
				<li>
					<Link to="/search/">Find post</Link>
				</li>
				<li>
					<Link to="/article/">SingleArticleFire</Link>
				</li>
				<li>
					Welcome back {displayName}
				</li>
				<li>
					<button onClick={logout}>Logout</button>
				</li>
			</ul>
		</nav>
	);
}

export default Menu;
