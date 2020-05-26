import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    const { options, data } = this.props.data;
    return (
      <div>
        <Line data={data}  options={ options } />
      </div>
    );
  }
}

export default LineChart;