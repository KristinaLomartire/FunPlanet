import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';


class DisplayNewArticleForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			newPost: '',
			newTimeStamp: '',
			tags: '',
			newPostHeader: ''
		}
	}
	/*
		left to do here is the form validation.
		It need a header, tags and the text should be more than 400 characters to be allowed to be saved.
	*/

	handleChangeNewPost = p => this.setState({ newPost: p.target.value });

	handleChangeNewPostTitle = p => this.setState({ newPostHeader: p.target.value });

	handleChangeNewTag = p => this.setState({ tags: p.target.value });

	handleClickAdd = p => {
		let tagArray = this.state.tags.split(',');
		tagArray = tagArray.map(tag => {
			return tag.trim();
		});

		let obj = {
			content: this.state.newPost,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			tags: tagArray,
			header: this.state.newPostHeader,
			createdBy: this.props.displayName,
			createdByUID: this.props.userID,
			loveCounter: 0
		};

		const collectionRef = firebase.firestore().collection('post');
		collectionRef.add(obj);

		this.setState({
			newPost: '',
			tags: '',
			newPostHeader: '',
		});
	};

	render() {
		return (
			<div className="CreateArticle">
				<h1>Skriv ett nytt inlägg</h1>
				<input type="text"
					value={this.state.newPostHeader}
					onChange={this.handleChangeNewPostTitle}
					placeholder="Skriv rubrik"
				/>
				<textarea type="text"
					value={this.state.newPost}
					onChange={this.handleChangeNewPost}
					placeholder="Skriv ett inlägg"
				/>
				<input type="text"
					value={this.state.tags}
					onChange={this.handleChangeNewTag}
					placeholder="Skriv dina taggar"
				/>
				<button className="posta" onClick={this.handleClickAdd}>
					Posta inlägg
				</button>
			</div>
		);
	};
}

export default DisplayNewArticleForm;
