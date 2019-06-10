import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import Login from './shared/Login';
import Routing from './shared/Routing';

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
		return (<Routing user={user} logout={logout} />);
	} else {
		return (<Login loginWithGoogle={loginWithGoogle} loginWithEmail={loginWithEmail} />)
	}
}

export default App;
