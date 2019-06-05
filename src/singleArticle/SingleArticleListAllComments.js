import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import SingleArticleComment from './SingleArticleComment';


const SingleArticleListAllComments = ({ articleID }) => {
    const [commentList, setCommentList] = useState(null);

    useEffect(() => {
        const db = firebase.firestore();
        const commentCollection = db.collection('comment').orderBy('timestamp', 'asc');

        let unsubscribe = commentCollection.onSnapshot(snapshot => {

            let list = [];
            snapshot.forEach(doc => {
                let obj = {
                    ...doc.data(),
                    id: doc.id
                };
                if (obj.mainPostUID === articleID) {
                    list.push(obj);
                }
            })
            setCommentList(list);
        })

        return unsubscribe;
    }, [])

    //Lista efter timestamp
    //db.collection('post').orderBy('timestamp', 'desc').limit(20)

    let jsxComments = null;

    if (commentList) {
        jsxComments = commentList.map((singleData) => (
            <SingleArticleComment key={singleData.id} singleData={singleData} />
        ));

        return (
            <ul className="listCommentsWrap">
                {jsxComments}
            </ul>
        )
    } else {
        return (<div>Loading Comments, plz w8</div>)
    }

}

export default SingleArticleListAllComments