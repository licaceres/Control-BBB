import React, { Component } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import { Col, Row, message, Modal, Typography } from 'antd';

import * as tools from '../../utils/ApiCalls';
import _ from 'lodash';

const { Text } = Typography;


class ModalSala extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exists: false,
      id: '',
      nombre: '',
      curso: '',
      fecha: '',
      moderatorPW: '',
      activa: '',
      duracion: '',
      grabando: '',
      participantes: '',
      oyentes: '',
      maxusr: '',
      moderadores: '',
      creador: '',
      svrorigen: '',
      origen: '',
      usuarios: '',
      loading: false,
      sala: '',
    };
  }

  render() {
    const { visibleModal, handleModal, loading } = this.props;
    const { exists, sala, usuarios } = this.state;
    console.log(usuarios);
    if (exists) {
      return (
        <Modal
          title={'Sala: ' + _.get(sala, 'meetingName[0]', '')}
          visible={visibleModal}
          okText='Cerrar'
          onOk={handleModal}
          okButtonProps={{
            disabled: loading,
            loading: loading
          }}
          onCancel={handleModal}
          cancelButtonProps={{
            style: { display: 'none' }
          }}
          width='80%'>
          <div>
            <Row justify="center">
              <Col span={12}>
                <Text code>Curso:</Text> {_.get(sala, 'metadata[0]["bbb-context"][0]', '')}mi curso<br />
                <Text code>Fecha:</Text>{_.get(sala, 'createDate[0]', '')}<br />
                <Text code>Pass Moderador:</Text> {_.get(sala, 'moderatorPW[0]', '')}<br />
                <Text code>Activa:</Text> {_.get(sala,'running[0]', '')}<br />
                <Text code>Duración:</Text> {_.get(sala, 'duration[0]', '')}<br />
                <Text code>Grabando:</Text> {_.get(sala, 'recording[0]', '')}<br />
                <Text code>Participantes:</Text> {_.get(sala, 'participantCount[0]', '')}<br />
              </Col>
              <Col span={12}>
                <Text code>Oyentes:</Text> {_.get(sala, 'listenerCount[0]', '')}<br />
                <Text code>Cant. Max. Usuarios:</Text> {_.get(sala, 'maxUsers[0]', '')}<br />
                <Text code>Moderadores:</Text> {_.get(sala, 'moderatorCount[0]', '')}<br />
                <Text code>Usuario Creador:</Text> {_.get(sala, 'metadata[0]["bn-userid"][0]', '')}<br />
                <Text code>Server Origen:</Text> {_.get(sala, 'metadata[0]["bbb-origin-server-name"][0]', '')}<br />
                <Text code>Origen:</Text> {_.get(sala, 'metadata[0]["bbb-origin"][0]', '')}<br />
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
    if (this.props.visibleModal && !this.state.id) {
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
}

export default ModalSala;