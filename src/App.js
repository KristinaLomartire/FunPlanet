import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Menu from './navigation/Menu';
import SingleArticleFire from './singleArticle/SingleArticleFire'
import PostListFire from './article/PostListFire'
import AddPost from './article/AddPost'
import Temp from './admin/temp'
import TagCloudFire from './tagCloud/tagCloudFire'

const App = () => {
	const [user, setUser] = useState(null);
	//const [userLevel, setUserLevel] = useState(null);

	// This make you auto loggedin for easier testing, so remove for production version
	firebase.auth().onAuthStateChanged(user => (user) ? setUser(user) : setUser(null));

	const loginWithGoogle = () => {
		// change firebase.auth.Auth.Persistence.LOCAL to NONE for production version
		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
			.then(() => {
				let provider = new firebase.auth.GoogleAuthProvider();
				firebase.auth().signInWithPopup(provider).then(result => {
					if (result.credential)
						setUser(firebase.auth().currentUser);
				});
			}).catch(error => console.log('Firebase auth error: ', error));
	};

	const loginWithEmail = () => {
		console.log('Clicked on loginWithEmail');
	};

	const logout = () => firebase.auth().signOut().then(() => setUser(null));

	if (user) {
		return (
			<Router>
				<main className="App">
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
								path="/temp/"
								component={Temp}
								exact
							/>
							<Route
								path="/temp/:magicURL"
								component={Temp}
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
								path="/article/"
								component={SingleArticleFire}
								exact
							/>
							<Route
								path="/article/:magicURL"
								component={SingleArticleFire} 
							/>
						</Switch>
					</div>
				</main>
			</Router>
		);
	} else {
		return (
			<div className="Login">
				You need to login.
				<br />
				<button onClick={loginWithGoogle}>Login with google.</button>
				<br />
				<button onClick={loginWithEmail}><strike>Login with email</strike></button>
			</div>
		);
	}
}

export default App;
