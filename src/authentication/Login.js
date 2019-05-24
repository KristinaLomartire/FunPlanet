import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const Login = () => {
	let [user, setUser] = useState(null);

	// This auto log you in if you been logged in before, so remove for production version
	firebase.auth().onAuthStateChanged(user => user ? setUser(user) : setUser(null));

	let loginWithGoogle = () => {
		console.log('login me!');

		// change firebase.auth.Auth.Persistence.LOCAL to NONE for production version
		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
		.then(function() {
  			var provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithPopup(provider).then(function(result) {
				if (result.credential) {
					setUser(firebase.auth().currentUser);
				}
			});
		})
		.catch(function(error) {
		// Handle Errors here.
			console.log('Firebase auth error: ', error);
			
		});
	};

	let logout = () => {
		firebase.auth().signOut().then(function() {
			console.log('Sign-out successful. ');
			setUser(null);
		}).catch(function(error) {
			console.log('Sign-out - An error happened.', error);
		  });
	};

	if (user != null) {
		let displayName;
		let photoURL;
		// User is signed in.
		user.providerData.forEach(function (profile) {
			// console.log("Sign-in provider: " + profile.providerId);
			// console.log("  Provider-specific UID: " + profile.uid);
			// console.log("  Name: " + profile.displayName);
			// console.log("  Email: " + profile.email);
			// console.log("  Photo URL: " + profile.photoURL);
			displayName = profile.displayName;
			photoURL = profile.photoURL
		  });
		
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
				<button>Login with email</button>
				you need to login.
				<br />
			</div>
		);
	}
	}

export default Login;
