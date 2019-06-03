import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';


class AddPost extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      newPost: '',
      newTimeStamp: '',
      tags: '',
      newPostHeader: '',
      userID: this.props.userID,
      displayName: this.props.displayName

    }
  }


  handleChangeNewPost = p => {
    this.setState({
      newPost: p.target.value,
    });
  }

  handleChangeNewPostTitle = p => {
    this.setState({
      newPostHeader: p.target.value,
    });
  }

  handleChangeNewTag = p => {
    this.setState({
      tags: p.target.value,
    });
  }

  handleClickAdd = p => {
    let tagArray = this.state.tags.split(',');
    tagArray = tagArray.map(tag => {
      return tag.trim()
    });
    if (this.state.tags === '') {
      return console.log('not a valid tag');
    }
    let obj = {
      content: this.state.newPost,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      tags: tagArray,
      header: this.state.newPostHeader,
      createdBy: this.state.displayName,
      createdByUID: this.state.userID,
      loveCounter: 0
    };
    const collectionRef = firebase.firestore().collection('post');
    collectionRef.add(obj)

    this.setState({
      newPost: '',
      tags: '',
      newPostHeader: '',
    })
  }



  render() {
    return (
      <div className="addPost">
        <input type="text" value={this.state.newPostHeader}
          onChange={this.handleChangeNewPostTitle}
          placeholder="Skriv rubrik" />
        <textarea type="text" value={this.state.newPost}
          onChange={this.handleChangeNewPost}
          placeholder="Skriv ett inlägg" />
        <input type="text" value={this.state.tags}
          onChange={this.handleChangeNewTag}
          placeholder="Skriv dina taggar" />
        <button onClick={this.handleClickAdd}> Posta </button>

      </div>

    )
  }

}

export default AddPost;
