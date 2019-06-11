import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import DisplayFullArticle from './DisplayFullArticle'

const SingleArticleFire = props => {
	const articleID = props.match.params.magicURL;
	const [article, setArticle] = useState(null);

	useEffect(() => {
		const db = firebase.firestore();
		let docRef = db.collection('post').doc(articleID);

		docRef.get().then(doc => {
			if (doc.exists)
				setArticle({ ...doc.data() })
		}).catch(error => console.log("Error getting document:", error));
	}, [articleID]);

	if (article != null) {
		return (
			<DisplayFullArticle
				article={article}
				userID={props.userID}
				articleID={articleID}
				displayName={props.displayName}
			/>
		)
	} else {
		return (<div>Loading, plz w8</div>)
	}
}

export default SingleArticleFire;
