import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// Components
import App from './components/app';
import Signup from './components/signup';
import GameContainer from './components/gameContainer';
import StatsContainer from './components/statsContainer';
import ScoreBoardContainer from './containers/scoreBoardContainer';

import Footer from './components/footer';

import { loadUser } from './actions'

// Reducers
import reducers from './reducers';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const createStoreWithMiddleware = applyMiddleware()(createStore);
const regularStore = createStore(reducers);


// <Provider store={createStoreWithMiddleware(reducers)}>

ReactDOM.render(
  <Provider store={regularStore}>
    <Router>
      <div style={{height: "100%"}}>
        <Route path="/" exact component={App} />
        <Route path="/signup/" exact component={Signup} />
        <Route path="/play/" exact component={GameContainer} />
        <Route path="/stats/" exact component={StatsContainer} />
        <Route path="/game/" exact component={ScoreBoardContainer} />
        <Footer />
      </div>
    </Router>
  </Provider>
  , document.querySelector('.containers'));
