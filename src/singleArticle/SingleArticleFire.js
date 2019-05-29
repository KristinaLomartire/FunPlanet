import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const SingleArticleFire = props => {
    // wee need props: (user id) and article id
    const articleId = props.articleId;
    const [article, setArticle] = useState(null);
    //const [commentData, setCommentData] = useState(null);
    //const [voteData, setVoteData] = useState(null);
    
    useEffect (() => {
        const db = firebase.firestore();
        let articleCollection = db.collection('post');

        const whenDone = doc => {
            console.log('we are there', doc);
            // här ska vi göra något med datan som kommer från databasen
            setArticle(doc.id())
        }
        
        const onError = () => {
            console.log('Nae du');
        }
                
        articleCollection.doc(articleId)
        .get().then(whenDone).catch(onError)

    }, [articleId]);

    return (
        <SingleArticle article={article}  />
    )

}
const SingleArticle = ({ article }) => {
    return (
        <div>
            <h1>{article}</h1>
            article.content
            TODO
            visa en specifik post/article
        </div>
    )
}

export default SingleArticleFire;
