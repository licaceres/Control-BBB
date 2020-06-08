import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import MainMenu from './components/MainMenu/MainMenu';
import { PrivateRoute } from './utils/PrivateRoute';
import './App.css';

function App() {

  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="/" roles={[1, 2]} component={MainMenu} />
    </Switch>
  );
}

export default App;