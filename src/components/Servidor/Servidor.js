import React, { Component } from 'react';
import { Col, DatePicker, Card } from 'antd';
import { DatabaseOutlined } from '@ant-design/icons';
import axios from 'axios';
import LineChart from './Charts/LineChart';
import _ from 'lodash';

const { RangePicker } = DatePicker;

class Servidor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
      },
      fechaInicio: new Date(Date.now()),
      fechaFin: new Date(Date.now()),
    };
  }
  render() {
    return (
      
      <div>
        <Card bordered={false} style={{ width: 600 }} title={<span style={{ fontSize: '1.2em' }}>Usuarios</span>} extra={<DatabaseOutlined />}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <RangePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DDTHH:mm"
              //onChange={this.onChange}
              onOk={this.onOk}
            />
          </Col>
        <LineChart data = {this.state.data} /> 
        </Card>
      </div>
    )
  }
  
  handleRequest = async () => {
    
    var resultado = await axios.get(`https://localhost:44398/api/UsuariosInstanciaSala/date/${this.state.fechaInicio}/${this.state.fechaFin}`);
    console.log(resultado);
    var labels = resultado.data.map((item)=> item.horaConsulta);
    var data = resultado.data.map((item)=> item.cantUsrs);
    this.setState({data:{
      labels: labels,
      datasets: [          
        {
        label: 'Usuarios',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data
      }]
    }})
  }

  componentDidMount() {
    this.handleRequest();
  }


  onOk = (value) => {
    if (_.get(value, '[0]', false) && _.get(value, '[1]', false)) {
      this.setState({fechaInicio: value[0].toISOString(),
        fechaFin: value[1].toISOString()});
      this.handleRequest();
    }
  }
  // onChange = async (value) => {
  //   if (_.get(value, '[0]', false) && _.get(value, '[1]', false)) {
  //     console.log(_.get(value, '[0]', false).toISOString());
  //     this.handleRequest(_.get(value, '[0]', false).toISOString(), _.get(value, '[1]', false).toISOString());
  //   }
  // }
}

export default Servidor;

