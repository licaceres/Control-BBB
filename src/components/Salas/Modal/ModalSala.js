import React, { Component } from 'react';
import axios from 'axios';
import { Col, Row, message, Modal, Typography } from 'antd';
import { url } from '../../../utils/Url';
import _ from 'lodash';
import './modalsala.css';

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
    const { exists, sala } = this.state;
    if (exists) {
      return (
        <Modal
          title={'Sala: ' + _.get(sala, 'meetingName', '')}
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
                <Text code>Curso:</Text> <span className="consulta-font">{_.get(sala, 'metadata["bbb-context"]', '')}</span><br />
                <Text code>Fecha:</Text> <span className="consulta-font">{_.get(sala, 'createDate', '')}</span><br />
                <Text code>Pass Moderador:</Text> <span className="consulta-font">{_.get(sala, 'moderatorPW', '')}</span><br />
                <Text code>Activa:</Text> <span className="consulta-font">{_.get(sala,'running', '')}</span><br />
                <Text code>Duración:</Text> <span className="consulta-font">{_.get(sala, 'duration', '')}</span><br />
                <Text code>Grabando:</Text> <span className="consulta-font">{_.get(sala, 'recording', '')}</span><br />
                <Text code>Participantes:</Text> <span className="consulta-font">{_.get(sala, 'participantCount', '')}</span><br />
              </Col>
              <Col span={12}>
                <Text code>Oyentes:</Text> <span className="consulta-font">{_.get(sala, 'listenerCount', '')}</span><br />
                <Text code>Cant. Max. Usuarios:</Text> <span className="consulta-font">{_.get(sala, 'maxUsers', '')}</span><br />
                <Text code>Moderadores:</Text> <span className="consulta-font">{_.get(sala, 'moderatorCount', '')}</span><br />
                <Text code>Usuario Creador:</Text> <span className="consulta-font">{_.get(sala, 'metadata["bn-userid"]', '')}</span><br />
                <Text code>Server Origen:</Text> <span className="consulta-font">{_.get(sala, 'metadata["bbb-origin-server-name"]', '')}</span><br />
                <Text code>Origen:</Text> <span className="consulta-font">{_.get(sala, 'metadata["bbb-origin"]', '')}</span><br />
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
      var resultado = await axios.post(url + '/api/salas/getmeetinginfo',this.props.sala);
      console.log(resultado);
      if (_.get(resultado.data, 'returncode', '') !== 'SUCCESS') {
        return message.error(_.get(resultado.data, 'messageKey', ''));
      }
      console.log(resultado);

      this.setState({
        exists: true,
        id: _.get(resultado.data, 'meetingID', ''),
        sala: resultado.data,
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