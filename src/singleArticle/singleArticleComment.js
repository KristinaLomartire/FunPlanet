import React from 'react';

const SingleArticleComment = props => {
  
    let dateWithHoursMin = props.singleData.timestamp.toDate();
            
        return (
            <li>
                {props.singleData.createdBy}
                {props.singleData.comment}
                {props.singleData.timestamp.toDate().toLocaleDateString()}
                {dateWithHoursMin.toLocaleTimeString({hour: '2-digit', minute:'2-digit'})}
            </li>
        )
}

export default SingleArticleComment;
