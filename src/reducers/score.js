// var firebase = require('firebase');
// var app = firebase.initializeApp({
//   apiKey: "AIzaSyCfoQ6hKBYJiJpSHzr48EZtP4YroOndvbI",
//   authDomain: "cricket-63fe4.firebaseapp.com",
//   databaseURL: "https://cricket-63fe4.firebaseio.com",
//   projectId: "cricket-63fe4",
//   storageBucket: "cricket-63fe4.appspot.com",
//   messagingSenderId: "287166849686"
// });

const newGame = {
}

const score = (state = newGame, action) => {
  switch (action.type) {
    case 'UPDATE_SCORE':
      console.log("NEW SCORE!");
      console.log(state);

      const player = action.payload.player;
      const score = action.payload.score;

      if(player in state){
        state[player].push(score);
      }

      else{
        state[player] = [score];
      }

      return state;

    case 'UNDO_SCORE':
      // fill this out when we want to undo the score
      return state;

    default:
      return state;
  }
}

export default score;


// another way of keeping score would be to have an array [20,20,20...] and remove each time it is hit.
// checking for win condition is as simple as checking that array is empty and score > oppo
// does make it difficult to keep track of more detailed stats
