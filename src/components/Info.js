import React, { Component } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import { Col, Row, Card, Tag } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import * as tools from '../utils/ApiCalls';


class Info extends Component {
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
        <Card title="Información" extra={<InfoCircleOutlined />}>
          <div className="site-card-wrapper">
            <Row gutter={16}>
              <Col span={8}>
                <Card title="Versión" type="inner" loading={this.state.loadingversion}>
                  BBB Version: <Tag style={{ marginLeft: '5px' }} color="processing">{this.state.version}</Tag>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Salas" type="inner" loading={this.state.loadingsalas}>
                  <Row>
                    <Col>
                      Total: <Tag style={{ marginLeft: '5px', marginRight: '25px' }} color="processing">{this.state.salas}</Tag>
                    </Col>
                    <Col>
                      Activas: <Tag style={{ marginLeft: '5px' }} color="processing">{this.state.activas}</Tag>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Card title" type="inner">
                  Card content
                </Card>
              </Col>
            </Row>
          </div>
        </Card>
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
    } else {
      this.setState({ salas: 0, loadingsalas: false, activas: count });
    }
  }

  componentDidMount() {
    this.handleRequest();
  }
}

export default Info;

