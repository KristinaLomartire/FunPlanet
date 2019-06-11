import React from 'react';
import 'firebase/firestore';
import WriteComment from './comments/WriteComment';
import HeartButton from './lovesupport/HeartButton';
import ListAllComments from './comments/ListAllComments'

const DisplayFullArticle = ({ article, userID, articleID, displayName }) => {
	let articleContentCreateMarkup = () => {
		return {
			__html: article.content.replace(/(\r\n|\n|\r)/gm, '<br />')
		};
	};

	return (
		<div>
			<p className="post" dangerouslySetInnerHTML={articleContentCreateMarkup()} />
			<HeartButton articleID={articleID} loveCounter={article.loveCounter} />
			<ListAllComments
				articleID={articleID}
			/>
			<WriteComment
				userID={userID}
				articleID={articleID}
				displayName={displayName}
			/>
		</div>
	)
}

export default DisplayFullArticle;
