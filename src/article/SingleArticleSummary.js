import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Link } from "react-router-dom";


const SingleArticleSummary = ({ post, userID }) => {
	const deletePost = () => {
		firebase.firestore().collection('post').doc(post.id).delete()
	}

	let maybePost = post.content;
	let dateWithHoursMin = 'Waiting for server...';
	let maybeName = post.createdBy;
	let maybeHeader = post.header;
	let tagURL = "/search/"
	let articleURL = "/article/";

	if (post.timestamp) {
		dateWithHoursMin = post.timestamp.toDate();
	}

	let maybePostCreateMarkup = () => {
		let shorterMaybePost = maybePost.substring(0, 100) + '...<br /><span style="text-decoration: underline;">Läs mer..</span>';

		return {
			__html: shorterMaybePost.replace(/(\r\n|\n|\r)/gm, '<br />')
		};
	};

	let maybeTag = post.tags.map(tag => (
		<Link key={tag} to={tagURL + tag}>{tag}, </Link>
	));

	let deleteButton = (
		<span className="delete" role="img" aria-label="delete" onClick={deletePost}> <i className="far fa-trash-alt" /> </span>
	)

	let shortTextLink = (
		<Link to={articleURL + post.id}>
			<p className="post" dangerouslySetInnerHTML={maybePostCreateMarkup()} />
		</Link>
	)

	return (
		<li className="SingleArticleSummary">
			<Link to={articleURL + post.id}>
				{(maybeHeader) ? <h1>{maybeHeader}</h1> : null}
			</Link>
			<p>
				<span className="time">
					{dateWithHoursMin.toLocaleDateString() + ' - '}
				</span>
				<span className="time">
					{dateWithHoursMin.toLocaleTimeString({ hour: '2-digit', minute: '2-digit' })}
				</span>
				<span className="userName">
					{maybeName}
					{(post.createdByUID === userID) ? deleteButton : null}
				</span>
			</p>
			{shortTextLink}
			<p className="tags">
				Sökord: {maybeTag}
			</p>
		</li>
	)

}



export default SingleArticleSummary;
