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
      usuarios: '',
      loadingversion: true,
      loadingsalas: true,
      loadingusuarios: true,

    };
  }

  render() {
    return(
      <div>
        <Row justify="center">
          <Col span={24}>
            <Card title="Estadísticas">
              <Col span={8}>
                <Card type="inner" loading={this.state.loadingversion}>
                  BBB Version: {this.state.version}
                </Card>
              </Col>
              <Col span={8}>
                <Card type="inner" loading={this.state.loadingsalas}>
                  Cantidad salas: {this.state.salas}
                  Cantidad usuarios: {this.state.usuarios}
                </Card>
              </Col>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  handleRequest = async () => {
    var resultado;
    await axios.get(localStorage.getItem('url'))
    .then((response) => {
        parseString(response.data, function (err, result) {
            console.log(err);
            resultado = result.response;
        });
      });
    this.setState({version: resultado.version, loadingversion: false});
    console.log();
    await axios.get(localStorage.getItem('url') + '/getMeetings?checksum=' + tools.checksum('getMeetings' + localStorage.getItem('clave')))
    .then((response) => {
        parseString(response.data, function (err, result) {
            console.log(err);
            resultado = result.response;
        });
      });
    console.log(resultado);
  }
  componentDidMount(){
    this.handleRequest();
  }
}



export default Estadistica;

