import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const Login = () => {
	let [user, setUser] = useState(null);
	let [displayName, setDisplayName] = useState(null);

	// This auto log you in if you been logged in before, so remove for production version
	firebase.auth().onAuthStateChanged(user => {
		if (user) {
			setUser(user);
			setDisplayName(user.displayName);
		}
	});

	let loginWithGoogle = () => {
		// change firebase.auth.Auth.Persistence.LOCAL to NONE for production version
		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
			.then(function () {
				var provider = new firebase.auth.GoogleAuthProvider();
				firebase.auth().signInWithPopup(provider).then(function (result) {
					if (result.credential) {
						setUser(firebase.auth().currentUser);
					}
				});
			})
			.catch(function (error) {
				console.log('Firebase auth error: ', error);
			});
	};

	let loginWithEmail = () => {

	};

	let logout = () => firebase.auth().signOut().then(() => setUser(null)).catch((error) => console.log('Sign-out error: ', error));

	if (user != null) {
		return (
			<div className="Login">
				Welcome back {displayName}.
				<br />
				<button onClick={logout}>logout.</button>
			</div>
		);
	} else {
		return (
			<div className="Login">
				<button onClick={loginWithGoogle}>Login with google.</button>
				<br />
				<button onClick={loginWithEmail}>Login with email</button>
				<br />
				you need to login.
				<br />
			</div>
		);
	}
}

export default Login;
