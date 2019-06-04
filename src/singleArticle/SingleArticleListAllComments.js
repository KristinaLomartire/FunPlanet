import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import SingleArticleComment from './SingleArticleComment';


const SingleArticleListAllComments = ({ articleID }) => {
    const [commentList, setCommentList] = useState(null);

    useEffect(() => {
        const db = firebase.firestore();
        const commentCollection = db.collection('comment');
        commentCollection.onSnapshot(snapshot => {
            let list = [];
            snapshot.forEach(doc => {
                let obj = {
                   ...doc.data(),
                    id: doc.id
                };                
                if(obj.mainPostUID === articleID) {
                    list.push(obj);
                }
            })
            setCommentList(list);
        })
    }, [])


    //1.Den printar inte heller ut de antal objekt som faktiskt finns i stateObjektet, dunno why
    //2.Loopen sorterar inte efter Timestamp 
    //2a.Loopen printar inte ut timestamp, vem som postade m.m.
    let jsxComments = null;

    if (commentList) {
        
        console.log(commentList)
        jsxComments = commentList.map((something) => (
            <li key={something.id}>{something.comment}</li>
        ));

        return (
            <ul>
                {jsxComments}
                {/* <SingleArticleComment /> */}
            </ul>
        )   

    } else {
        return (<div>Loading Comments, plz w8</div>)
    }

}

export default SingleArticleListAllComments




