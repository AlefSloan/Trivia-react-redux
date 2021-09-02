import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import FeedBack from './pages/Feedback';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ FeedBack } />
        </Switch>
      </div>
    );
  }
}

export default App;
