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

	const filterChange = event => setTagSearch(event.target.value);

	let ArticleSummaryList = [];
	if (postData) {
		postData.forEach(post => {
			post.tags.forEach(tag => {
				if (tag.toUpperCase() === tagSearch.toUpperCase()) {
					ArticleSummaryList.push(
						<SingleArticleSummary
							key={post.id}
							post={post}
							userID={props.userID}
						/>
					);
				}
			});
		});
	}

	return (
		<div>
			<div>
				<input className="search" type="text" value={tagSearch} onChange={filterChange} />
			</div>

			<ul className="articleList">{ArticleSummaryList}</ul>
		</div>
	);
};

export default DisplayTagSearch;
