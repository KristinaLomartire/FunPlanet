import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const SingleArticleVote = ({ articleID, loveCounter }) => {
	const [heartCounter, setHeartCounter] = useState(loveCounter);

	const clickedSupport = () => {
		firebase.firestore().collection('post').doc(articleID).update(
			{ loveCounter: heartCounter + 1 }
		);
		setHeartCounter(heartCounter + 1);
	};

	return (
		<p style={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-end',
			fontSize: '1.2em'
		}}>
			<span>{heartCounter}</span>
			<span
				style={{ cursor: 'pointer', marginLeft: '0.3em' }}
				onClick={clickedSupport}
			>
				<i className="fas fa-heartbeat"></i>
			</span>
		</p >
	);
};

export default SingleArticleVote;
