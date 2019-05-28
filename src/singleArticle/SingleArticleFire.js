import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const SingleArticleFire = () => {

    const [commentData, setCommentData, voteData, setVoteData] = useState(null);

    const db = firebase.firestore();
    let singleArticleCollection = db.collection('comment');
    // let collectionOfData = []; 
    // snapshot.forEach(doc =>{
    //     let obj = {
    //         ...doc.data(),
    //         id: doc.id
    //     };
    //     collectionOfData.push(obj);

    // })
    
    const whenDone = snapshot => {
        console.log('we are there', singleArticleCollection)
    }

    const onError = () => {
        console.log('Nae du');
    }
    
    singleArticleCollection.get().then(whenDone).catch(onError)

    return (
        
        <div> detta funkar </div>
    )
    
}

export default SingleArticleFire;
