import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import SingleArticleDisplay from './SingleArticleDisplay'

const SingleArticleFire = props => {
    const articleID = props.match.params.magicURL;
    const [article, setArticle] = useState(null);
    //const [commentData, setCommentData] = useState(null);
    //const [voteData, setVoteData] = useState(null);

    useEffect(() => {
        const db = firebase.firestore();
        let articleCollection = db.collection('post');

        const whenDone = doc => {
            if (doc.exists)
                setArticle({ ...doc.data() });
            else
                console.log('Något gick fel med hämtningen från DB');
        }

        articleCollection.doc(articleID).get().then(whenDone)

    }, [articleID]);

    if (article != null) {
        return (
            <SingleArticleDisplay
                article={article}
                userID={props.userID}
                articleID={articleID}
            />
        )

    } else {
        return (<div>Loading, plz w8</div>)
    }

}

export default SingleArticleFire;
