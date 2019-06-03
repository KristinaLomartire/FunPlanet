import React from 'react';

const SingleArticleVote = () => {
	const clickedSupport = () => {
		console.log('hello world');
	}
	return (
		<p style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
			<span>0</span>
			<span
				style={{ fontSize: '2em', cursor: 'pointer' }}
				onClick={clickedSupport}
			>
				❤
			</span>
		</p >
	);
};

export default SingleArticleVote;
