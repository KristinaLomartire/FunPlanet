import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import Login from './shared/Login';
import Routing from './navigation/Routing';

const App = () => {
	const [user, setUser] = useState(null);

	firebase.auth().onAuthStateChanged(user => (user) ? setUser(user) : setUser(null));

	const loginWithGoogle = () => {
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
			<main className="App">
				<Routing user={user} logout={logout} />
			</main>
		);
	} else {
		return (
			<main className="App">
				<Login loginWithGoogle={loginWithGoogle} loginWithEmail={loginWithEmail} />
			</main>
		);
	}
}

export default App;
