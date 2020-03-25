import React, { Component } from 'react';
import './App.css';



class App extends Component () {

  constructor(props) {
    super(props);
    
    this.state = {
      url: 'http://test-install.blindsidenetworks.com/bigbluebutton/api',
      clave: '8cd8console.log(url);ef52e8e101574e400365b55e11a6'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render(){
    return (
      <div>
        <Main
          handleSubmit={this.handleSubmit} />
      </div>
      
    );
  }

  handleSubmit = (url, clave) => {  
    this.url = url;
    this.clave = clave;
    this.setState({ url, clave });
    
  }
  
  onChange = (value, key) => {
    this.setState({ [key]: value });
  }
}


export default App;
