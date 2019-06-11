import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Menu from './Menu';
import DisplayFullArticle from '../fullArticle/DisplayFullArticle';
import DisplayArticlesSummarys from '../article/DisplayArticlesSummarys';
import DisplayNewArticleForm from '../createArticle/DisplayNewArticleForm';
import DisplayTagSearch from '../search/DisplayTagSearch';


const Routing = ({ user, logout }) => {
	return (
		<Router>
			<div className="logo">
				<Link to="/">
					<i className="fas fa-people-carry" /> Share
				</Link>
			</div>

			<Menu
				logout={logout}
				displayName={user.displayName}
			/>

			<div className="MainDisplayArea">
				<Switch>
					<Route path="/"
						render={(props) =>
							<DisplayArticlesSummarys {...props}
								userID={user.uid}
							/>
						}
						exact
					/>
					<Route path="/write/"
						render={(props) =>
							<DisplayNewArticleForm {...props}
								userID={user.uid}
								displayName={user.displayName}
							/>
						}
					/>
					<Route
						path="/search/"
						component={DisplayTagSearch}
						exact
					/>
					<Route
						path="/search/:magicURL"
						component={DisplayTagSearch}
					/>
					<Route
						path="/article/:magicURL"
						render={(props) =>
							<DisplayFullArticle
								{...props}
								userID={user.uid}
								displayName={user.displayName}
							/>
						}
					/>
				</Switch>
			</div>
		</Router>
	);
};

export default Routing;