import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';


class AddPost extends React.Component {


  state = {
    newPost: '',
    newTimeStamp: '',
    userId: '',
  }


  handleChangeNewPost = p => {
    this.setState({
      newPost: p.target.value,
    });
  }


    handleClickAdd = p => {

      let obj = {
        content: this.state.newPost,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };
      const collectionRef = firebase.firestore().collection('post');
      collectionRef.add(obj)

      this.setState({
        newPost: '',
      })
    }



  render () {
    return (
      <div className="addPost">
        <input type="text" value={this.state.newPost}
              onChange={this.handleChangeNewPost}
              placeholder="Skriv ett inlägg" />
        <button onClick={this.handleClickAdd}> Posta </button>

      </div>

    )
  }

}

export default AddPost;
