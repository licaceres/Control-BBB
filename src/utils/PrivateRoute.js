import '../App.css';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Spin } from 'antd';

export const PrivateRoute = (ChildComponent) => class PrivateRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      currentUser: null,
      hasTried: false
    };
  }

  componentDidMount() {
    this.auth();
  }

  auth = () => {
    this.setState({ loading: true });
    // CHEQUEO USUARIO EN LOCAL STORAGE
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // SIMULO ASINCRONIA
    setTimeout(
      () => {
        this.setState({
          currentUser,
          hasTried: true,
          loading: false
        });
      },
      2000
    );
  }

  render() {
    const { currentUser, hasTried, loading } = this.state;

    // SI NO INTENTO AUTH Y ESTA LOADING SPINNER
    if (!hasTried || loading) {
      return (
        <div className='auth-spin'>
          <div><Spin size='large' /></div>
        </div>
      );
    }

    // SI EXISTE USER AL PANEL
    if (!!currentUser) {
      return (
        <ChildComponent {...this.props} />
      );
    }

    // SINO AL LOGIN
    return (
      <Redirect to='/login'  />
    );
  }
};

export default (ChildComponent) => PrivateRoute(ChildComponent);