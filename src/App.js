import 'antd/dist/antd.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './utils/PrivateRoute'
import Login from './components/Login';
import Home from './components/Home';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login} exact />
        <Route path='/' component={PrivateRoute(Home)} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
