import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import SingleArticleSummary from '../article/SingleArticleSummary';
import TagCloudDisplay from '../tagCloud/TagCloudDisplay'

const DisplayTagSearch = props => {
	const [postData, setPostData] = useState(null);
	const [tagSearch, setTagSearch] = useState(props.match.params.magicURL);

	if (props.match.params.magicURL === undefined) {
		if (tagSearch === undefined)
			setTagSearch('');
	} else {
		// this create problem that we cannot write new search since it will overwrite tagSearch with url data.
		if (tagSearch !== props.match.params.magicURL)
			setTagSearch(props.match.params.magicURL);
	}

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
		<div className="search">
			<TagCloudDisplay posts={postData} />
			<div>
				<input
					type="text"
					value={tagSearch}
					onChange={filterChange}
					placeholder="Angiv ditt sökord!"
				/>
			</div>

			<ul className="articleList">{ArticleSummaryList}</ul>
		</div>
	);
};

export default DisplayTagSearch;
