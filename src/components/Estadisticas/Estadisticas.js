import React, { Component } from 'react';
import { Row, Col, DatePicker, Card } from 'antd';
import { DatabaseOutlined } from '@ant-design/icons';
import axios from 'axios';
import LineChart from './Charts/LineChart';
import BarChart from './Charts/BarChart';
import _ from 'lodash';
import './estadisticas.css';
import moment from 'moment';
import { url } from '../../utils/Url';
import { getHeader } from '../../utils/Header';

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
      usuariosD: {
        options: {
        },
        data: {
        },
      },
      salas: {
        options: {
        },
        data: {
        },
      },
      salasDt: {
        options: {
        },
        data: {
        }
      },
      fechaInicio: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
      fechaFin: new Date().toISOString(),
    }
  }
  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <div className="card-style">
              <Card bordered={false} title={<span style={{ fontSize: '1.2em' }}>Usuarios por hora</span>} extra={<DatabaseOutlined />}>
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
            <div className="card-style">
              <Card bordered={false} title={<span style={{ fontSize: '1.2em' }}>Salas por hora</span>} extra={<DatabaseOutlined />}>
                <Col>
                  <RangePicker
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DDTHH:mm"
                    //onChange={this.onChange}
                    onOk={this.okSalas}
                  />
                </Col>
                <LineChart data={this.state.salas} />
              </Card>
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <div className="card-style">
              <Card bordered={false} title={<span style={{ fontSize: '1.2em' }}>Usuarios por fecha</span>} extra={<DatabaseOutlined />}>
                <Col>
                  <RangePicker
                    format="YYYY-MM-DD"
                    //onChange={this.onChange}
                    onChange={this.okUsuariosD}
                  />
                </Col>
                <BarChart data={this.state.usuariosD} />
              </Card>
            </div>
          </Col>
          <Col span={12}>
            <div className="card-style">
              <Card bordered={false} title={<span style={{ fontSize: '1.2em' }}>Salas por fecha</span>} extra={<DatabaseOutlined />}>
                <Col>
                  <RangePicker
                    format="YYYY-MM-DD"
                    //onChange={this.onChange}
                    onChange={this.okSalasDt}
                  />
                </Col>
                <BarChart data={this.state.salasDt} />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    )
  }

  usuariosRequest = async (inicio, fin) => {
    var resultado = await axios.get(url + `/api/salas/fecha/${inicio}/${fin}`, getHeader());
    var labels = resultado.data.map((item) => moment(item.horaConsulta).toISOString());
    var data = resultado.data.map((item) => item.cant);
    console.log(resultado);
    this.setState({
      usuarios: {
        options: {
          responsive: false,
          scales: {
            xAxes: [{
              type: 'time',
              display: false,
              time: {
                displayFormats: {
                  day: 'DD MM '
                }
              },
              ticks: {
                min: 0,
                maxTicksLimit: 10
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
              fill: true,
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

  usuariosDRequest = async (inicio, fin) => {
    var resultado = await axios.get(url + `/api/salas/usrdate/${inicio}/${fin}`, getHeader());
    var labels = resultado.data.map((item) => moment(item.horaConsulta).format("DD-MM-YYYY"));
    var data = resultado.data.map((item) => item.cant);
    this.setState({
      usuariosD: {
        options: {
          responsive: true,
          scales: {
            xAxes: [{
              type: 'date',
              display: false,
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

  salasRequest = async (inicio, fin) => {
    var resultado = await axios.get(url + `/api/salas/datetime/${inicio}/${fin}`,getHeader());
    var labels = resultado.data.map((item) => moment(item.horaConsulta).format("DD-MM-YYYY HH:mm"));
    var data = resultado.data.map((item) => item.cant);
    this.setState({
      salas: {
        options: {
          responsive: false,
          type: 'time',
          scales: {
            xAxes: [{
              display: false,
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

  salasDtRequest = async (inicio, fin) => {
    var resultado = await axios.get(url + `/api/salas/date/${inicio}/${fin}`,getHeader());
    var labels = resultado.data.map((item) => moment(item.horaConsulta).format("DD-MM-YYYY"));
    var data = resultado.data.map((item) => item.cant);
    console.log(resultado);
    this.setState({
      salasDt: {
        options: {
          responsive: false,
          scales: {
            xAxes: [{
              type: 'date',
              display: false,
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
              fill: true,
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

  componentDidMount() {
    this.usuariosRequest(this.state.fechaInicio, this.state.fechaFin);
    this.salasRequest(this.state.fechaInicio, this.state.fechaFin);
    this.salasDtRequest(this.state.fechaInicio, this.state.fechaFin)
    this.usuariosDRequest(this.state.fechaInicio, this.state.fechaFin)
  }

  okUsuarios = (value) => {
    if (_.get(value, '[0]', false) && _.get(value, '[1]', false)) {
      this.usuariosRequest(moment(value[0]).toISOString(), moment(value[1]).toISOString());
    }
  }

  okUsuariosD = (value) => {
    if (_.get(value, '[0]', false) && _.get(value, '[1]', false)) {
      this.usuariosDRequest(moment(value[0]).toISOString(), moment(value[1]).toISOString());
    }
  }

    okSalas = (value) => {
      if (_.get(value, '[0]', false) && _.get(value, '[1]', false)) {
        this.salasRequest(moment(value[0]).toISOString(), moment(value[1]).toISOString());
      }
    }

    okSalasDt = (value) => {
      if (_.get(value, '[0]', false) && _.get(value, '[1]', false)) {
        this.salasDtRequest(moment(value[0]).toISOString(), moment(value[1]).toISOString());
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

