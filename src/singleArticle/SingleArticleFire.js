import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const SingleArticleFire = props => {
    // wee need props: (user id) and article id
    const articleId = props.match.params.magicURL;
    const [article, setArticle] = useState(null);
    //const [commentData, setCommentData] = useState(null);
    //const [voteData, setVoteData] = useState(null);

    useEffect(() => {
        const db = firebase.firestore();
        let articleCollection = db.collection('post');

        const whenDone = doc => {
            if (doc.exists) {
                // console.log('this is what we got from firebaseDB', articleId);
                // här ska vi göra något med datan som kommer från databasen
                setArticle({ ...doc.data(), id: doc.id });

            } else
                console.log('Något gick fel med hämtningen från DB');

        }

        articleCollection.doc(articleId).get().then(whenDone)

    }, [articleId]);

    if (article != null) {
        // console.log('Detta är den unika artikeln som hämtas ut från ett just nu hårdkodat artID i App.js',"'",article.content,"'");
        return (
            <SingleArticle article={article} />
        )

    } else {
        return (<div>Loading, plz w8</div>)
    }

}
const SingleArticle = ({ article }) => {
    let articleContentCreateMarkup = () => {
        return {
            __html: article.content.replace(/(\r\n|\n|\r)/gm, '<br />')
        };
    };
    return (
        <div>
            <p className="post" dangerouslySetInnerHTML={articleContentCreateMarkup()} />
            <br></br>
            visa en specifik post/article
        </div>
    )
}

export default SingleArticleFire;
