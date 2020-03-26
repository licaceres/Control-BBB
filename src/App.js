import React, { Component } from 'react';
import './App.css';
import { Main } from './components/Main';



class App extends Component () {

  constructor(props) {
    super(props);
    
    this.state = {
      url: 'http://test-install.blindsidenetworks.com/bigbluebutton/api',
      clave: '8cd8console.log(url);ef52e8e101574e400365b55e11a6'
    };
    this.update = this.update.bind(this);
  }
  render(){
    console.log(this.state.url);
    return (
      <div>
        <Main hSubmit={this.update} url={this.state.url} clave={this.state.clave} />
      </div>
      
    );
  }

  update = (url, clave) => {  
    this.url = url;
    this.clave = clave;
    this.setState({ url, clave });
    
  }
  
  onChange = (value, key) => {
    this.setState({ [key]: value });
    console.log(value)
  }
}


export default App;
