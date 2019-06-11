import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import SingleArticleSummary from '../article/SingleArticleSummary';


const DisplayTagSearch = props => {
	const [postData, setPostData] = useState(null);
	const [tagSearch, setTagSearch] = useState(props.match.params.magicURL);

	if (tagSearch === undefined)
		setTagSearch('');

	useEffect(() => {
		const db = firebase.firestore();
		const postCollection = db.collection('post').orderBy('timestamp', 'desc');

		let unsubscribe = postCollection.onSnapshot(snapshot => {
			let list = [];
			snapshot.forEach(doc => {
				let obj = {
					...doc.data(),
					id: doc.id
				};
				if (obj.tags.includes(tagSearch))
					list.push(obj);
			});
			if (list.length > 0 && typeof list !== 'undefined') {
				setPostData(list);
			} else {
				setPostData(null);
			}
		})
		return unsubscribe;
	}, [tagSearch])

	const filterChange = event => setTagSearch(event.target.value);

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
			<div>
				<input className="inlägg" type="text" value={tagSearch} onChange={filterChange} />
			</div>

			{
				(postData === null) ?
					(tagSearch === '') ?
						<p>Skriv tag för sökning</p>
						:
						<p>Din sökning gav inget resultat </p>
					:
					<ul className="articleList">{ArticleSummaryList}</ul>
			}
		</div>
	);
};

export default DisplayTagSearch;
