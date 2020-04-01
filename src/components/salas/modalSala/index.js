import React, { Component } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import { Col, Row, message, Modal } from 'antd';
import * as tools from '../../../globalComponents/api_calls/index';
import _ from 'lodash';

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
    };
  }

  render() {
    const { visibleModal, handleModal, loading } = this.props;
    const { exists, id, nombre, curso, fecha, moderatorPW, activa, duracion, grabando, participantes, oyentes,
      maxusr, moderadores, creador, svrorigen, origen, usuarios } = this.state;
      console.log(usuarios);
    if (exists) {
      return (
        <Modal
          title={nombre}
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
          width='95%'>
          <div>
            <Row justify="center">
              <Col span={24}>
                Curso: {curso}<br />
                Fecha: {fecha}<br />
                Pass Moderador: {moderatorPW}<br />
                Activa: {activa}<br />
                Duración: {duracion}<br />
                Grabando: {grabando}<br />
                Participantes: {participantes}<br />
                Oyentes: {oyentes}<br />
                Cant. Max. Usuarios: {maxusr}<br />
                Moderadores: {moderadores}<br />
                Usuario Creador: {creador}<br />
                Server Origen: {svrorigen}<br />
                Origen: {origen}<br />
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
        nombre: _.get(resultado, 'meetingName[0]', ''),
        curso: _.get(resultado, 'metadata[0]["bbb-context"][0]', ''),
        fecha: _.get(resultado, 'createDate[0]', ''),
        moderatorPW: _.get(resultado, 'moderatorPW[0]', ''),
        activa: _.get(resultado,'running[0]', ''),
        duracion: _.get(resultado, 'duration[0]', ''),
        grabando: _.get(resultado, 'recording[0]', ''),
        participantes: _.get(resultado, 'participantCount[0]', ''),
        oyentes: _.get(resultado, 'listenerCount[0]', ''),
        maxusr: _.get(resultado, 'maxUsers[0]', ''),
        moderadores: _.get(resultado, 'moderatorCount[0]', ''),
        creador: _.get(resultado, 'metadata[0]["bn-userid"][0]', ''),
        svrorigen: _.get(resultado, 'metadata[0]["bbb-origin-server-name"][0]', ''),
        origen: _.get(resultado, 'metadata[0]["bbb-origin"][0]', ''),
        usuarios: _.get(resultado, 'attendees[0]', ''),
      });
      console.log(this.state.id);
    }
  }
}

export default ModalSala;