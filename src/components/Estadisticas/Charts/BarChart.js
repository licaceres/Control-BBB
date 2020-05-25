import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { options, data } = this.props.data;
        return (
            <div>
                <Bar
                    data={data}
                    options={
                        options
                    }
                />
            </div>
        );
    }
};

export default BarChart;