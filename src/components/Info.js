import React, { Component } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import { Col, Row, Card, Tag, message } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
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
                <Card title="Usuarios" type="inner" loading={this.state.loadingusuarios}>
                  Total Usuarios: <Tag style={{ marginLeft: '5px' }} color="processing">{this.state.totalusuarios}</Tag><br />
                  Total Moderadores: <Tag style={{ marginLeft: '5px' }} color="processing">{this.state.totalmoderadores}</Tag><br />
                  Total Oyentes: <Tag style={{ marginLeft: '5px' }} color="processing">{this.state.oyentes}</Tag><br />
                  Total con Audio: <Tag style={{ marginLeft: '5px' }} color="processing">{this.state.conaudio}</Tag><br />
                  Total con Video: <Tag style={{ marginLeft: '5px' }} color="processing">{this.state.convideo}</Tag>
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
        if (resultado[i].running[0] === 'true')
          count++;

        minfo = await axios.get(tools.getMeetingInfo(resultado[i]))
        .then((response) => {return new Promise((resolve, reject) =>{
          parseString(response.data, function (err, result) {
            if (result.response.returncode[0] !== 'SUCCESS') {
              reject (message.error(result.response.messageKey[0], '  ' + err));
            }
            resolve(_.get(result, 'response', ''));
          })});
        }
        );
        totusrs = totusrs + parseInt(_.get(minfo, 'participantCount[0]', 0));
        moders = moders + parseInt(_.get(minfo, 'moderatorCount[0]', 0));
        oyentes = oyentes + parseInt(_.get(minfo, 'listenerCount[0]', 0));
        conaudio = conaudio + parseInt(_.get(minfo, 'voiceParticipantCount[0]', 0));
        convideo = convideo + parseInt(_.get(minfo, 'videoCount[0]', 0));


      }
      
      this.setState({ salas: resultado.length, 
        loadingsalas: false,
        loadingusuarios: false, 
        activas: count, 
        totalmoderadores: moders, 
        totalusuarios: totusrs,
        oyentes: oyentes,
        conaudio: conaudio,
        convideo: convideo });
    } else {
      this.setState({ salas: 0, loadingsalas: false, activas: count });
    }
    
  }

  componentDidMount() {
    this.handleRequest();
  }
}

export default Info;

