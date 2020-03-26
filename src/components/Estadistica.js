import React, { Component } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import { getHeader } from '../utils';



class Estadistica extends Component {
  render() {
    
    this.handleRequest();
    return(
      <div>
        <h1>Estadística</h1>
        <div>
          
        </div>
      </div>
    );
  }
  handleRequest = async () => {
    const resp = await axios.get(localStorage.getItem('url'))
    .then((response) => {
        parseString(response.data, function (err, result) {
            console.log(err);
            console.log(result);
        });
      });

    console.log(resp);
    return resp;
  }
}

export default Estadistica;

