import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    const { data, options } = this.props;
    //console.log(this.props.options);
    return (
      <div>
        <Line data={data}  options={ options } />
      </div>
    );
  }
}

export default LineChart;