import React from 'react';
import 'firebase/firestore';
import SingleArticleWriteComment from './SingleArticleWriteComment';
import SingleArticleVote from './SingleArticleVote';

const SingleArticleDisplay = ({ article, userID, articleID }) => {
	let articleContentCreateMarkup = () => {
		return {
			__html: article.content.replace(/(\r\n|\n|\r)/gm, '<br />')
		};
	};
	return (
		<div>
			<p className="post" dangerouslySetInnerHTML={articleContentCreateMarkup()} />
			<SingleArticleVote />
			{/* här kommer alla kommentarer
            <SingleArticleDisplayComments />
            */}
			<SingleArticleWriteComment
				userID={userID}
				articleID={articleID}
			/>
		</div>
	)
}

export default SingleArticleDisplay;
