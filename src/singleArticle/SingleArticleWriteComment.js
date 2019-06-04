import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

class SingleArticleWriteComment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userID: this.props.userID,
			mainPost: this.props.articleID,
			comment: '',
		}
	}
    
	handleChangeComment = c => {
        this.setState({
            comment: c.target.value,
		});
	}
	handleSaveComment = () => {
        let obj = {
			comment: this.state.comment,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			createdByUID: this.state.userID,
            mainPostUID: this.props.articleID,
            createdBy: this.props.displayName
		};
		const collectionRef = firebase.firestore().collection('comment');
		collectionRef.add(obj)

		this.setState({ comment: '' })
	}
	render() {
		return (
			<div className="addPost" >
				<textarea type="text" value={this.state.comment}
					onChange={this.handleChangeComment}
					placeholder="Skriv din kommentar" />
				<br />
				<button onClick={this.handleSaveComment}> Posta Kommentar </button>
			</div>
		);
	}
}

export default SingleArticleWriteComment;
