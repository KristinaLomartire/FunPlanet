import React from 'react';

// Hämta information om en article från SingleArticleFire (state)
// Kolla av articleId
// Om dess värde är != Null så...
// - visa hela artikeln
// Annars...
// - gör ingenting

const singleArticleComment = props => {

    const articleId = props.match.params.magicURL;

    console.log(articleId)
    return (
        <p>articleId</p>
        )


}

export default singleArticleComment;