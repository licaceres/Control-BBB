import React, { Component } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import { Col, Row, message, Modal, Typography } from 'antd';

import * as tools from '../../../utils/ApiCalls';
import _ from 'lodash';
import './ModalSala.css';

const { Text } = Typography;


class ModalSala extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exists: false,
      // id: '',
      // nombre: '',
      // curso: '',
      // fecha: '',
      // moderatorPW: '',
      // activa: '',
      // duracion: '',
      // grabando: '',
      // participantes: '',
      // oyentes: '',
      // maxusr: '',
      // moderadores: '',
      // creador: '',
      // svrorigen: '',
      // origen: '',
      usuarios: '',
      loading: false,
      sala: '',
    };
  }

  render() {
    const { visibleModal, loading } = this.props;
    const { exists, sala, usuarios } = this.state;
    console.log(usuarios);
    if (exists) {
      return (
        <Modal
          title={'Sala: ' + _.get(sala, 'meetingName[0]', '')}
          visible={visibleModal}
          okText='Cerrar'
          onOk={this.okModal}
          okButtonProps={{
            disabled: loading,
            loading: loading
          }}
          onCancel={this.okModal}
          cancelButtonProps={{
            style: { display: 'none' }
          }}
          width='80%'>
          <div>
            <Row justify="center">
              <Col span={12}>
                <Text code>Curso:</Text> <span className="consulta-font">{_.get(sala, 'metadata[0]["bbb-context"][0]', '')}mi curso</span><br />
                <Text code>Fecha:</Text> <span className="consulta-font">{_.get(sala, 'createDate[0]', '')}</span><br />
                <Text code>Pass Moderador:</Text> <span className="consulta-font">{_.get(sala, 'moderatorPW[0]', '')}</span><br />
                <Text code>Activa:</Text> <span className="consulta-font">{_.get(sala,'running[0]', '')}</span><br />
                <Text code>Duración:</Text> <span className="consulta-font">{_.get(sala, 'duration[0]', '')}</span><br />
                <Text code>Grabando:</Text> <span className="consulta-font">{_.get(sala, 'recording[0]', '')}</span><br />
                <Text code>Participantes:</Text> <span className="consulta-font">{_.get(sala, 'participantCount[0]', '')}</span><br />
              </Col>
              <Col span={12}>
                <Text code>Oyentes:</Text> <span className="consulta-font">{_.get(sala, 'listenerCount[0]', '')}</span><br />
                <Text code>Cant. Max. Usuarios:</Text> <span className="consulta-font">{_.get(sala, 'maxUsers[0]', '')}</span><br />
                <Text code>Moderadores:</Text> <span className="consulta-font">{_.get(sala, 'moderatorCount[0]', '')}</span><br />
                <Text code>Usuario Creador:</Text> <span className="consulta-font">{_.get(sala, 'metadata[0]["bn-userid"][0]', '')}</span><br />
                <Text code>Server Origen:</Text> <span className="consulta-font">{_.get(sala, 'metadata[0]["bbb-origin-server-name"][0]', '')}</span><br />
                <Text code>Origen:</Text> <span className="consulta-font">{_.get(sala, 'metadata[0]["bbb-origin"][0]', '')}</span><br />
              </Col>
            </Row>
          </div>
        </Modal>
      );
    } else {
      return null;
    }
  }

  componentDidUpdate = async () => {
    if (this.props.visibleModal && !this.state.exists) {
      var resultado = null;
      await axios.get(tools.getMeetingInfo(this.props.sala))
        .then((response) => {
          parseString(response.data, function (err, result) {
            if (result.response.returncode[0] !== 'SUCCESS') {
              return message.error(resultado.messageKey[0]);
            }

            resultado = result.response;
            console.log(resultado);

          });
        }
        );

      this.setState({
        exists: true,
        id: _.get(resultado, 'meetingID[0]', ''),
        sala: resultado,
      });
      console.log(this.state.id);
    }
  }
  okModal = () => {
    this.props.handleModal();
    this.setState({exists: false, sala: ''});
  }
}

export default ModalSala;