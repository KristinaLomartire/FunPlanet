import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';


class AddPost extends React.Component {

    constructor(props){
      super(props);

      this.state = {
        newPost: '',
        newTimeStamp: '',
        tags: '',
        userID: this.props.userID,
        displayName: this.props.displayName

    }
    console.log(this.state);
  }


  handleChangeNewPost = p => {
    this.setState({
      newPost: p.target.value,
    });
  }

  handleChangeNewTag = p => {
    this.setState({
      tags: p.target.value,
    });
  }

    handleClickAdd = p => {
      let tagArray = this.state.tags.split(',')
      let obj = {
        content: this.state.newPost,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        tags: tagArray,
        createdBy: this.state.displayName,
        createdByUID: this.state.userID
      };
      const collectionRef = firebase.firestore().collection('post');
      collectionRef.add(obj)

      this.setState({
        newPost: '',
        tags: '',
      })
    }



  render () {
    return (
      <div className="addPost">
        <textarea type="text" value={this.state.newPost}
              onChange={this.handleChangeNewPost}
              placeholder="Skriv ett inlägg" />
        <input type="text" value={this.state.newTag}
                onChange={this.handleChangeNewTag}
                placeholder="Skriv dina taggar"/>
        <button onClick={this.handleClickAdd}> Posta </button>

      </div>

    )
  }

}

export default AddPost;
