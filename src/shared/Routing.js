import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Menu from '../navigation/Menu';
import SingleArticleFire from '../singleArticle/SingleArticleFire'
import PostListFire from '../article/PostListFire'
import AddPost from '../article/AddPost'
import TagCloudFire from '../tagCloud/tagCloudFire'


const Routing = ({ user, logout }) => {
	return (
		<Router>
			<main className="App">
				<div className="logo">
					<Link to="/">
						<i className="fas fa-people-carry" /> Share
				</Link>
				</div>
				<Menu logout={logout} displayName={user.displayName} />
				<div className="MainDisplayArea">
					{/* This is where the component will be rendered. */}
					<Switch>
						<Route path="/"
							render={(props) => <PostListFire {...props}
								userID={user.uid}
							/>}
							exact
						/>
						<Route path="/addpost/"
							render={(props) => <AddPost {...props}
								userID={user.uid}
								displayName={user.displayName}
							/>}
						/>
						<Route
							path="/search/"
							component={TagCloudFire}
							exact
						/>
						<Route
							path="/search/:magicURL"
							component={TagCloudFire}
						/>
						<Route
							path="/article/:magicURL"
							render={(props) =>
								<SingleArticleFire
									{...props}
									userID={user.uid}
									displayName={user.displayName}
								/>}
						/>
					</Switch>
				</div>
			</main>
		</Router>
	);
};

export default Routing;