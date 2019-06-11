import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import SingleArticleSummary from './SingleArticleSummary';

const DisplayArticlesSummarys = props => {
	const [postData, setPostData] = useState(null);

	useEffect(() => {
		const db = firebase.firestore();
		let postCollection;
		postCollection = db.collection('post').orderBy('timestamp', 'desc').limit(20);

		let unsubscribe = postCollection.onSnapshot(snapshot => {
			let list = [];
			snapshot.forEach(doc => {
				let obj = {
					...doc.data(),
					id: doc.id
				};
				list.push(obj);
			})
			setPostData(list);
		})
		return unsubscribe;
	}, []);

	let ArticleSummaryList = null;
	if (postData) {
		ArticleSummaryList = postData.map(post => (
			<SingleArticleSummary
				key={post.id}
				post={post}
				userID={props.userID}
			/>
		));
	}

	return (
		<div>
			<ul className="articleList">
				{ArticleSummaryList}
			</ul>
		</div>
	)
}

export default DisplayArticlesSummarys;
