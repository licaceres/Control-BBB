import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    const { data } = this.props;
    console.log(this.props);
    return (
      <div>
        <Line data={data}  options={{label: {display: false}}} />
      </div>
    );
  }
}

export default LineChart;