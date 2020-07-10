import React, { Component } from 'react';
import axios from 'axios';
import { Col, Row, Card, Empty } from 'antd';
import { InfoCircleOutlined, DesktopOutlined, TeamOutlined } from '@ant-design/icons';
import { getHeader } from '../../utils/Header';
import { url } from '../../utils/Url';
import _ from 'lodash';
import './info.css';

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
    }
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
    ver = await axios.get(url + `/api/dataconfig/version`);
    ver = ver.data;
    this.setState({ version: ver.version, loadingversion: false });


    resultado = await axios.get(url + `/api/salas/nowsalas`);
    resultado = resultado = _.get(resultado.data, 'meetings.meeting', 0);
    console.log(resultado);
    
    var count = 0;
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

        totusrs = totusrs + parseInt(_.get(resultado[i], 'participantCount', 0));
        moders = moders + parseInt(_.get(resultado[i], 'moderatorCount', 0));
        oyentes = oyentes + parseInt(_.get(resultado[i], 'listenerCount', 0));
        conaudio = conaudio + parseInt(_.get(resultado[i], 'voiceParticipantCount', 0));
        convideo = convideo + parseInt(_.get(resultado[i], 'videoCount', 0));


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

  componentDidMount = async () => {
    var resultado = await axios.get(url + `/api/dataconfig`, getHeader());
    localStorage.setItem('url', resultado.data.urlServerBbb);
    localStorage.setItem('clave', resultado.data.secretSharedBbb);
    this.handleRequest();
  }
}

export default Info;

