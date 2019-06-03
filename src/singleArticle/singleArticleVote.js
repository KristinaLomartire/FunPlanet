import React, {useState} from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const SingleArticleVote = ({articleID, loveCounter}) => {
	const [heartCounter, setHeartCounter] = useState(loveCounter);

	const clickedSupport = () => {
		firebase.firestore().collection('post').doc(articleID).update(
			{loveCounter: heartCounter + 1 }
		);
		setHeartCounter(heartCounter + 1);
	};

	return (
		<p style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
			<span>{ heartCounter }</span>
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
