import React, { Component } from 'react';
import { Row, Col, DatePicker, Card } from 'antd';
import { DatabaseOutlined } from '@ant-design/icons';
import axios from 'axios';
import LineChart from './Charts/LineChart';
import BarChart from './Charts/BarChart';
import _ from 'lodash';
import './Estadisticas.css';
import moment from 'moment';
import { url } from '../../utils/Url';

const { RangePicker } = DatePicker;

class Estadisticas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usuarios: {
        options: {
        },
        data: {
        },
        // fechaInicio: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
        // fechaFin: new Date().toISOString(),
      },
      salas: {
        options: {
        },
        data: {
        },
      },
      fechaInicio: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
        fechaFin: new Date().toISOString(),
    }
  }
  render() {
    return (

      <div>
        <Row gutter={16}>
          <Col span={12}>
            <div className="card-style">
              <Card bordered={false} title={<span style={{ fontSize: '1.2em' }}>Usuarios</span>} extra={<DatabaseOutlined />}>
                <Col>
                  <RangePicker
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DDTHH:mm"
                    //onChange={this.onChange}
                    onOk={this.okUsuarios}
                  />
                </Col>
                <LineChart data={this.state.usuarios} />
              </Card>
            </div>
          </Col>
          <Col span={12}>
            <Card bordered={false} title={<span style={{ fontSize: '1.2em' }}>Salas</span>} extra={<DatabaseOutlined />}>
              <Col>
                <RangePicker
                  format="YYYY-MM-DD"
                  //onChange={this.onChange}
                  onChange={this.okSalas}
                />
              </Col>
              <BarChart data={this.state.salas} />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }

  usuariosRequest = async (inicio, fin) => {
    var resultado = await axios.get(url + `/api/salas/fecha/${inicio}/${fin}`);
    var labels = resultado.data.map((item) => moment(item.horaConsulta));
    var data = resultado.data.map((item) => item.cant);
    console.log(resultado);
    this.setState({
      usuarios: {
        options: {
          responsive: false,
          scales: {
            xAxes: [{
              type: 'time',
              ticks: {
                min: 0,
              }

            }],
            yAxes: [{
              ticks: {
                min: 0,
              }
            }]
          }
        },
        data: {
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
        }
      }
    })
  }

  salasRequest = async (inicio, fin) => {
    var resultado = await axios.get(url + `/api/salas/salas/${inicio}/${fin}`);
    var labels = resultado.data.map((item) => moment(item.horaConsulta).format("DD-MM-YYYY"));
    var data = resultado.data.map((item) => item.cant);
    this.setState({
      salas: {
        options: {
          responsive: false,
          scales: {
            xAxes: [{
              type: 'date',
              ticks: {
                min: 0,
              }

            }],
            yAxes: [{
              ticks: {
                min: 0,
              }
            }]
          }
        },
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Salas',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: data
            }]
        }
      }
    })
  }
  
  componentDidMount() {
    this.usuariosRequest(this.state.fechaInicio, this.state.fechaFin);
    this.salasRequest(this.state.fechaInicio, this.state.fechaFin);
  }

  okUsuarios = (value) => {
    if (_.get(value, '[0]', false) && _.get(value, '[1]', false)) {
      this.usuariosRequest(moment(value[0]).toISOString(), moment(value[1]).toISOString());
    }
  }

    okSalas = (value) => {
      if (_.get(value, '[0]', false) && _.get(value, '[1]', false)) {
        this.salasRequest(moment(value[0]).toISOString(), moment(value[1]).toISOString());
      }
    }
  // onChange = async (value) => {
  //   if (_.get(value, '[0]', false) && _.get(value, '[1]', false)) {
  //     console.log(_.get(value, '[0]', false).toISOString());
  //     this.handleRequest(_.get(value, '[0]', false).toISOString(), _.get(value, '[1]', false).toISOString());
  //   }
  // }
}

export default Estadisticas;

