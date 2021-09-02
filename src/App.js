import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import FeedBack from './pages/Feedback';
import Login from './pages/Login';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/feedback" component={ FeedBack } />
        </Switch>
      </div>
    );
  }
}
export default App;
