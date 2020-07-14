import '../App.css';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route {...rest} render={props => {
      const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      
      if (!currentUser) {
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }

      if (roles && roles.indexOf(currentUser.idRol) === -1) {
        return <Redirect to={{ pathname: '/' }} />
      }

      return <Component {...props} />
  }} />
)