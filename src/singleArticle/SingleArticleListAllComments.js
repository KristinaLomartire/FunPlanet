import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';


const SingleArticleListAllComments = ({ articleID }) => {
    const [commentList, setCommentList] = useState(null);

    // useEffect(() => {
    //     const db = firebase.firestore();
    //     let commentCollection = db.collection('comment');
    //     console.log(commentCollection.comment);

    //     const whenDone = doc => {
    //         if (doc.exists)
    //             setCommentList({ ...doc.data() });
    //         else
    //             console.log('Något gick fel med hämtningen från DB');
    //     }
    //     commentCollection.doc().get().then(whenDone)
    //     // console.log(articleID)
    //     console.log(commentList)
    // },);

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
                list.push(obj);
            })
            setCommentList(list);
        })
    }, [])


    //1.Den printar inte heller ut de antal objekt som faktiskt finns i stateObjektet, dunno why
    //2.Loopen sorterar inte efter Timestamp 
    //2a.Loopen printar inte ut timestamp, vem som postade m.m.
    let jsxComments = null;

    if (commentList) {

        // let listOfComments = commentList.map(comment => <li key={commentList.mainPostUID === articleID}>comment</li>)
        // return (
        //     <ul>{listOfComments}</ul>
        // )
        jsxComments = commentList.map((something, index) => (
            <li key={something.id}>{something.comment}</li>
        ));

        return (
            <ul>
                {jsxComments}
            </ul>
        )

        // console.log(commentList)
        // console.log(commentList[0].mainPostUID)
        // for (let i=0;i<10;i++) {
        //     console.log([i])
        //     if (commentList[i].mainPostUID === articleID) {
        //         console.log(commentList[i].comment)
        //         return (`${commentList[i].comment}`)
        //     }
        // }   

    } else {
        return (<div>Loading Comments, plz w8</div>)
    }

}

export default SingleArticleListAllComments
    //************************************************** */

    // const SingleArticleComment = ({articleID}) => {
        //     console.log(articleID)
        //     return (
            // 		<ul>articleID.comment</ul>
            // 	)
            // }



            // Hämta information från ... ? PostID och dess kommentarer
            // Spara alla kommentarer i en lista
            // Lista ut dom efter timestamp

    // commentCollection.onSnapshot(snapshot => {
    // console.log('We got some unicorns');
    // 	let list = [];
    // 	snapshot.forEach(doc => {
    // 		let obj = {
    // 			...doc.data(),
    // 			id: doc.id
    // 		};
    // 		list.push(obj);
    // 	})
    // 	setCommentList(list);
    // })

    //************************************************** */




