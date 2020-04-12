import React, { Component } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import { Col, Row, Card, message, Empty } from 'antd';
import { InfoCircleOutlined, DesktopOutlined, TeamOutlined } from '@ant-design/icons';
import * as tools from '../utils/ApiCalls';
import _ from 'lodash';
import '../styles/info.css'

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
        <Card bordered={false} title={<span style={{fontSize: '1.2em'}}>Información</span>} extra={<InfoCircleOutlined />}>
          <div className="site-card-wrapper">
            <Row gutter={[16, 16]} justify="center">
              <Col xs={24} sm={24} md={8} lg={8}>
                <Card size="small"  bordered={false} style={{backgroundColor: '#191919'}} title="Versión BBB" extra={<InfoCircleOutlined />}>
                  {this.state.loadingversion ? <Empty imageStyle={{ height: '20px' }} image={Empty.PRESENTED_IMAGE_SIMPLE} description="No hay datos" />
                    :
                    <div>
                      <span className="card-content-font">{this.state.version}</span>
                      {/* <Row gutter={[16, 16]}>
                        <Col span={12}>
                          <Text code>BBB Version: </Text> <Tag style={{ marginLeft: '5px' }} color="processing">{this.state.version}</Tag>
                        </Col>
                        <Col span={12}></Col>
                      </Row> */}
                    </div>
                  }
                </Card>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <Card size="small"  bordered={false} style={{backgroundColor: '#191919'}} title="Total Salas" extra={<DesktopOutlined />}>
                  {this.state.loadingsalas ? <Empty imageStyle={{ height: '20px' }} image={Empty.PRESENTED_IMAGE_SIMPLE} description="No hay datos" />
                    :
                    <div>
                      <span className="card-content-font">{this.state.salas}</span>
                      {/* <Row gutter={[16, 16]}>
                        <Col span={12}>
                          <Text code>Total: </Text> <Tag style={{ marginLeft: '5px' }} color="processing">{this.state.salas}</Tag>
                        </Col>
                        <Col span={12}>
                          <Text code>Activas: </Text> <Tag style={{ marginLeft: '5px' }} color="processing">{this.state.activas}</Tag>
                        </Col>
                      </Row> */}
                    </div>
                  }
                </Card>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <Card size="small"  bordered={false} style={{backgroundColor: '#191919'}} title="Salas Activas" extra={<DesktopOutlined />}>
                  {this.state.loadingsalas ? <Empty imageStyle={{ height: '20px' }} image={Empty.PRESENTED_IMAGE_SIMPLE} description="No hay datos" />
                    :
                    <div>
                      <span className="card-content-font">{this.state.activas}</span>
                      {/* <Row gutter={[16, 16]}>
                        <Col span={12}>
                          <Text code>Total: </Text> <Tag style={{ marginLeft: '5px' }} color="processing">{this.state.salas}</Tag>
                        </Col>
                        <Col span={12}>
                          <Text code>Activas: </Text> <Tag style={{ marginLeft: '5px' }} color="processing">{this.state.activas}</Tag>
                        </Col>
                      </Row> */}
                    </div>
                  }
                </Card>
              </Col>
            </Row>
            <Row gutter={[16, 16]} justify="center">
              <Col xs={24} sm={24} md={8} lg={8}>
              <Card size="small"  bordered={false} style={{backgroundColor: '#191919'}} title="Total Usuarios" extra={<TeamOutlined />}>
                  {this.state.loadingusuarios ? <Empty imageStyle={{ height: '20px' }} image={Empty.PRESENTED_IMAGE_SIMPLE} description="No hay datos" />
                    :
                    <div>
                      <span className="card-content-font">{this.state.totalusuarios}</span>
                    </div>
                  }
                </Card>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                <Card size="small"  bordered={false} style={{backgroundColor: '#191919'}} title="Total Moderadores" extra={<TeamOutlined />}>
                  {this.state.loadingusuarios ? <Empty imageStyle={{ height: '20px' }} image={Empty.PRESENTED_IMAGE_SIMPLE} description="No hay datos" />
                    :
                    <div>
                      <span className="card-content-font">{this.state.totalmoderadores}</span>
                    </div>
                  }
                </Card>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                <Card size="small"  bordered={false} style={{backgroundColor: '#191919'}} title="Total Oyentes" extra={<TeamOutlined />}>
                  {this.state.loadingusuarios ? <Empty imageStyle={{ height: '20px' }} image={Empty.PRESENTED_IMAGE_SIMPLE} description="No hay datos" />
                    :
                    <div>
                      <span className="card-content-font">{this.state.oyentes}</span>
                    </div>
                  }
                </Card>
                </Col>
                </Row>
                <Row gutter={[16, 16]} justify="center">
                <Col xs={24} sm={24} md={8} lg={8}>
                <Card size="small"  bordered={false} style={{backgroundColor: '#191919'}} title="Total con Audio" extra={<TeamOutlined />}>
                  {this.state.loadingusuarios ? <Empty imageStyle={{ height: '20px' }} image={Empty.PRESENTED_IMAGE_SIMPLE} description="No hay datos" />
                    :
                    <div>
                      <span className="card-content-font">{this.state.conaudio}</span>
                    </div>
                  }
                </Card>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                <Card size="small" bordered={false} style={{backgroundColor: '#191919'}} title="Total con Video" extra={<TeamOutlined />}>
                  {this.state.loadingusuarios ? <Empty imageStyle={{ height: '20px' }} image={Empty.PRESENTED_IMAGE_SIMPLE} description="No hay datos" />
                    :
                    <div>
                      <span className="card-content-font">{this.state.convideo}</span>
                    </div>
                  }
                </Card>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                </Col>

                {/* <Card size="small" title="Usuarios" type="inner" extra={<TeamOutlined />}>
                                    
                  {this.state.loadingusuarios ? <Empty description="No hay datos" />
                    :
                    <div>
                      <Row gutter={[16, 16]}>
                        <Col span={8}>
                        <Text code>Total Usuarios: </Text> <Tag style={{ marginLeft: '5px' }} color="processing">{this.state.totalusuarios}</Tag><br />
                        </Col>
                        <Col span={8}>
                        <Text code>Total Moderadores: </Text> <Tag style={{ marginLeft: '5px' }} color="processing">{this.state.totalmoderadores}</Tag><br />
                        </Col>
                        <Col span={8}>
                        <Text code>Total Oyentes: </Text> <Tag style={{ marginLeft: '5px' }} color="processing">{this.state.oyentes}</Tag><br />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={8}>
                        <Text code>Total con Audio: </Text> <Tag style={{ marginLeft: '5px' }} color="processing">{this.state.conaudio}</Tag><br />
                        </Col>
                        <Col span={8}>
                        <Text code>Total con Video: </Text> <Tag style={{ marginLeft: '5px' }} color="processing">{this.state.convideo}</Tag>
                        </Col>
                        <Col span={8}></Col>
                      </Row>
                    </div>
                  }
                </Card> */}
              
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

