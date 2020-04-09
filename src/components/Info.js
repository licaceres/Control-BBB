import React, { Component } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import { Col, Row, Card, Tag, message, Empty } from 'antd';
import { InfoCircleOutlined, DesktopOutlined, TeamOutlined } from '@ant-design/icons';
import * as tools from '../utils/ApiCalls';
import _ from 'lodash';


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
      totalusuarios: 0,
      totalmoderadores: 0,
      oyentes: 0,
      conaudio: 0,
      convideo: 0,
    };
  }

  render() {
    return (
      <div>
        <Card title="Información" extra={<InfoCircleOutlined />}>
          <div className="site-card-wrapper">
            <Row gutter={[16, 16]} justify="center">
              <Col xs={24} sm={24} md={12} lg={12}>
                <Card title="Versión" type="inner" extra={<InfoCircleOutlined />}>
                  {this.state.loadingversion ? <Empty description="No hay datos" />
                    :
                    <div>
                      <Row gutter={[16, 16]}>
                        <Col span={12}>
                          BBB Version: <Tag style={{ marginLeft: '5px' }} color="processing">{this.state.version}</Tag>
                        </Col>
                        <Col span={12}></Col>
                      </Row>
                    </div>
                  }
                </Card>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                <Card title="Salas" type="inner" extra={<DesktopOutlined />}>
                  {this.state.loadingsalas ? <Empty description="No hay datos" />
                    :
                    <div>
                      <Row gutter={[16, 16]}>
                        <Col span={12}>
                          Total: <Tag style={{ marginLeft: '5px' }} color="processing">{this.state.salas}</Tag>
                        </Col>
                        <Col span={12}>
                          Activas: <Tag style={{ marginLeft: '5px' }} color="processing">{this.state.activas}</Tag>
                        </Col>
                      </Row>
                    </div>
                  }
                </Card>
              </Col>
            </Row>
            <Row gutter={[16, 16]} justify="center">
              <Col xs={24} sm={24} md={24} lg={24}>
                <Card title="Usuarios" type="inner" extra={<TeamOutlined />}>
                  {this.state.loadingusuarios ? <Empty description="No hay datos" />
                    :
                    <div>
                      <Row gutter={[16, 16]}>
                        <Col span={8}>
                          Total Usuarios: <Tag style={{ marginLeft: '5px' }} color="processing">{this.state.totalusuarios}</Tag><br />
                        </Col>
                        <Col span={8}>
                          Total Moderadores: <Tag style={{ marginLeft: '5px' }} color="processing">{this.state.totalmoderadores}</Tag><br />
                        </Col>
                        <Col span={8}>
                          Total Oyentes: <Tag style={{ marginLeft: '5px' }} color="processing">{this.state.oyentes}</Tag><br />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                          Total con Audio: <Tag style={{ marginLeft: '5px' }} color="processing">{this.state.conaudio}</Tag><br />
                        </Col>
                        <Col span={8}>
                          Total con Video: <Tag style={{ marginLeft: '5px' }} color="processing">{this.state.convideo}</Tag>
                        </Col>
                        <Col span={8}></Col>
                      </Row>
                    </div>
                  }
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
    var totusrs = 0;
    var moders = 0;
    var oyentes = 0;
    var conaudio = 0;
    var convideo = 0;
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
          resultado = _.get(result, 'response.meetings[0].meeting', 0);
        });
      });

    var count = 0;
    let minfo = 0;
    if (resultado !== 0) {
      for (var i = 0; i < resultado.length; ++i) {
        if (resultado[i].running[0] === 'true') {
          count++;
        }
        this.setState({
          salas: resultado.length,
          loadingsalas: false,
          activas: count,
        });
      }
      for (i = 0; i < resultado.length; ++i) {
        try {
          minfo = await axios.get(tools.getMeetingInfo(resultado[i]))
            .then((response) => {
              return new Promise((resolve, reject) => {
                parseString(response.data, function (err, result) {
                  if (result.response.returncode[0] !== 'SUCCESS') {
                    reject(message.error(result.response.messageKey[0], '  ' + err));
                  }
                  resolve(_.get(result, 'response', ''));
                })
              });
            }
            );
        } catch (error) {
          console.log(error);
        }
        totusrs = totusrs + parseInt(_.get(minfo, 'participantCount[0]', 0));
        moders = moders + parseInt(_.get(minfo, 'moderatorCount[0]', 0));
        oyentes = oyentes + parseInt(_.get(minfo, 'listenerCount[0]', 0));
        conaudio = conaudio + parseInt(_.get(minfo, 'voiceParticipantCount[0]', 0));
        convideo = convideo + parseInt(_.get(minfo, 'videoCount[0]', 0));


      }

      this.setState({
        loadingusuarios: false,
        totalmoderadores: moders,
        totalusuarios: totusrs,
        oyentes: oyentes,
        conaudio: conaudio,
        convideo: convideo
      });
    } else {
      this.setState({ salas: 0, loadingsalas: false, activas: count });
    }

  }

  componentDidMount() {
    this.handleRequest();
  }
}

export default Info;

