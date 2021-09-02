import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';

// import login from './pages/login';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
      </header>
      {/* <Switch>
        <Route exact path="/" component={ login } />
      </Switch> */}
    </div>
  );
}
