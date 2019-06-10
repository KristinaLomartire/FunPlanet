import React from 'react';
import 'firebase/firestore';
import SingleArticleWriteComment from './SingleArticleWriteComment';
import SingleArticleVote from './SingleArticleVote';
import SingleArticleListAllComments from './SingleArticleListAllComments'

const SingleArticleDisplay = ({ article, userID, articleID, displayName }) => {
	let articleContentCreateMarkup = () => {
		return {
			__html: article.content.replace(/(\r\n|\n|\r)/gm, '<br />')
		};
	};

	return (
		<div>
			<p className="post" dangerouslySetInnerHTML={articleContentCreateMarkup()} />
			<SingleArticleVote articleID={articleID} loveCounter={article.loveCounter} />
			<SingleArticleListAllComments
				articleID={articleID}
			/>
			<SingleArticleWriteComment
				userID={userID}
				articleID={articleID}
				displayName={displayName}
			/>
		</div>
	)
}

export default SingleArticleDisplay;
