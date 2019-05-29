import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Menu from './navigation/Menu';
import PostListFire from './article/PostListFire'
import SingleArticleFire from './singleArticle/SingleArticleFire'
import Temp from './admin/temp'

const App = () => {
	const [user, setUser] = useState(null);
	const [displayName, setDisplayName] = useState(null);
	const [userID, setUserID] = useState(null);

	// This make you auto loggedin for easier testing, so remove for production version
	firebase.auth().onAuthStateChanged(user => {
		if (user) {
			setUser(user);
			setDisplayName(user.displayName);
			setUserID(user.uid)
			console.log('Current userID: ', userID);
		}
	});

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
					<Menu logout={logout} displayName={displayName} />
					<div className="MainDisplayArea">
						{/* This is where the component will be rendered. */}
						<Route path="/"
							render={(props) => <PostListFire {...props}
							userID={userID}
							displayName={displayName}/>
						} exact/>
						<Route path="/temp/" component={Temp} />
					</div>
                    <SingleArticleFire articleId="DdArkzdmu8Mbc8q3FBb1" />
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
				<button onClick={loginWithEmail}>Login with email</button>
			</div>
		);
	}
}

export default App;
