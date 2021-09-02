import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';

import Login from './pages/login';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          VALENDO UM MELÃO DE REAIS
        </p>
      </header>
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
