import React, { Component } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import { Col, Row, Card } from 'antd';
import * as tools from '../globalComponents/api_calls/index';


class Estadistica extends Component {
  constructor(props) {
    super(props);

    this.state = {
      version: '',
      salas: '',
      activas: '',
      usuarios: '',
      loadingversion: true,
      loadingsalas: true,
      loadingusuarios: true,

    };
  }

  render() {
    return (
      <div>
        <Row justify="center">
          <Col span={24}>
            <Card title="Estadísticas">
              <div className="site-card-wrapper">
                <Col span={8}>

                  <Card type="inner" loading={this.state.loadingversion}>
                    BBB Version: {this.state.version}
                  </Card>
                </Col>
                <Col span={8}>
                  <Card type="inner" loading={this.state.loadingsalas}>
                    Cantidad salas: {this.state.salas}<br />
                  Salas activas: {this.state.activas}
                  </Card>

                </Col>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  handleRequest = async () => {
    var ver;
    var resultado;
    await axios.get(localStorage.getItem('url'))
      .then((response) => {
        parseString(response.data, function (err, result) {
          console.log(err);
          ver = result.response;
        });
      });
    this.setState({ version: ver.version, loadingversion: false });


    await axios.get(tools.getMeetings())
      .then((response) => {
        parseString(response.data, function (err, result) {
          console.log(err);
          resultado = result.response.meetings[0].meeting;
        });
      });

    var count = 0;
    if (resultado !== undefined) {
      for (var i = 0; i < resultado.length; ++i) {
        if (resultado[i].running[0] === 'true')
          count++;
      }
      this.setState({ salas: resultado.length, loadingsalas: false, activas: count });
    }else{
      this.setState({ salas: 0, loadingsalas: false, activas: count });
    }
  }
  componentDidMount() {
    this.handleRequest();
  }
}



export default Estadistica;

