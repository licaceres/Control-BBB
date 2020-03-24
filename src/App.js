import React, { Component } from 'react';
import './App.css';



class App extends Component () {

  constructor(props) {
    super(props);
  
    this.state = {
      url: 'http://test-install.blindsidenetworks.com/bigbluebutton/api',
      clave: '8cd8ef52e8e101574e400365b55e11a6'
    };
  }
  render(){
    return (
      <div></div>
    );
  }
}

export default App;
