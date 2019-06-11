import React from 'react';

const SingleComment = props => {

	if (!props) {
		return (
			(<li>Loading Comments, plz w8</li>)
		)
	} else {
		if (props.singleData.timestamp === null) {
			return (<li>Timestamp skapas</li>)
		}
		let dateWithHoursMin = props.singleData.timestamp.toDate();
		return (
			<li className="singleComment">
				<span className="scUID"> {props.singleData.createdBy} </span>
				<span className="scComment"> {props.singleData.comment}  </span>
				<span className="scDate"> {props.singleData.timestamp.toDate().toLocaleDateString()}  </span>
				<span className="scDateHM"> {dateWithHoursMin.toLocaleTimeString({ hour: '2-digit', minute: '2-digit' })} </span>
			</li>
		)
	}
}

export default SingleComment;
