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
				<p>
					<span className="time">
						{dateWithHoursMin.toLocaleDateString() + ' - '}
					</span>
					<span className="time">
						{dateWithHoursMin.toLocaleTimeString({ hour: '2-digit', minute: '2-digit' })}
					</span>
					<span className="userName">
						{props.singleData.createdBy}
					</span>
				</p>
				<p className="scComment">
					{props.singleData.comment}
				</p>
			</li>
		)
	}
}

export default SingleComment;
