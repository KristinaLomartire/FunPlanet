import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import WriteComment from './comments/WriteComment';
import HeartButton from './lovesupport/HeartButton';
import ListAllComments from './comments/ListAllComments'

const DisplayFullArticle = props => {
	const articleID = props.match.params.magicURL;
	const [article, setArticle] = useState(null);
	let dateWithHoursMin = 'Waiting for server...';

	useEffect(() => {
		const db = firebase.firestore();
		let docRef = db.collection('post').doc(articleID);

		docRef.get().then(doc => {
			if (doc.exists)
				setArticle({ ...doc.data() })
		}).catch(error => console.log("Error getting document:", error));
	}, [articleID]);

	let articleContentCreateMarkup = () => {
		return {
			__html: article.content.replace(/(\r\n|\n|\r)/gm, '<br />')
		};
	};

	if (article != null) {
		if (article.timestamp) {
			dateWithHoursMin = article.timestamp.toDate();
		}

		return (
			<div className="FullArticle">
				<h1>
					{article.header}
				</h1>
				<span className="time">
					{dateWithHoursMin.toLocaleDateString() + ' - '}
				</span>
				<span className="time">
					{dateWithHoursMin.toLocaleTimeString({ hour: '2-digit', minute: '2-digit' })}
				</span>
				<span className="userName">
					{article.createdBy}
				</span>
				<p
					className="post"
					dangerouslySetInnerHTML={articleContentCreateMarkup()}
				/>
				<HeartButton
					articleID={articleID}
					loveCounter={article.loveCounter}
				/>
				<ListAllComments
					articleID={articleID}
				/>
				<WriteComment
					userID={props.userID}
					articleID={articleID}
					displayName={props.displayName}
				/>
			</div>
		);
	} else {
		return (<div>Loading, plz w8</div>)
	}
}

export default DisplayFullArticle;
