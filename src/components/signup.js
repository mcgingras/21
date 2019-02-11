import React, { Component } from 'react';
import Header from './header';

export default class Signup extends Component {
  constructor(props){
    super(props);

    this.password     = React.createRef();
    this.email = React.createRef();
    this.username = React.createRef();
  }

  createUser() {
    var email = this.email.value;
    var password = this.password.value;
    var username = this.username.value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((player) => {
      const uid = player.user.uid;
      console.log("we created the user");
      firebase.database().ref('players/' + uid).set(
        {
          email: email,
          username: username
        });
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });

    // firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   console.log(errorCode);
    //   console.log(errorMessage);
    // });
  }

  render() {
    return (
      <div>
        <Header path="/" right="add" title="Add Player" />
        <input
          type="text"
          className="input"
          placeholder="email"
          ref={ node => this.email = node }
        />

        <input
          type="text"
          classpassword="input"
          placeholder="password"
          ref={ node => this.password = node }
        />

        <input
          type="text"
          className="input"
          placeholder="username"
          ref={ node => this.username = node }
        />

        <button onClick={ (e) => { this.createUser() } }>submit</button>
      </div>
    );
  }
}
