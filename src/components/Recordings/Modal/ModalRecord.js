import React, { Component } from 'react';
import { Col, Row, Modal, Typography } from 'antd';
import _ from 'lodash';
import './modalrecord.css';
import moment from 'moment';


const { Text } = Typography;


class ModalRecord extends Component {
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
      recording: '',
    };
  }

  render() {
    const { visibleModal, loading, recording } = this.props;
    const { exists } = this.state;
    if (exists) {
      return (
        <Modal
          title={'Grabación: ' + _.get(recording, 'name', '')}
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
                <Text code>RecordID:</Text> <span className="consulta-font">{_.get(recording, 'recordID', '')}</span><br />
                <Text code>Id sala:</Text> <span className="consulta-font">{_.get(recording, 'meetingID', '')}</span><br />
                <Text code>Nombre sala:</Text> <span className="consulta-font">{_.get(recording, 'name', '')}</span><br />
                <Text code>Inicio:</Text> <span className="consulta-font">{moment(parseFloat(_.get(recording,'startTime', ''))).toString()}</span><br />
                <Text code>Fin:</Text> <span className="consulta-font">{moment(parseFloat(_.get(recording,'endTime', ''))).toString()}</span><br />
                <Text code>Participantes:</Text> <span className="consulta-font">{_.get(recording, 'participants', '')}</span><br />
                <Text code>Tamaño:</Text> <span className="consulta-font">{_.get(recording, 'size', '')} bytes</span><br />
              </Col>
              <Col span={12}>
                <Text code>Origen:</Text> <span className="consulta-font">{_.get(recording, 'metadata.bbborigin', '')}</span><br />
                <Text code>Url Origen:</Text> <span className="consulta-font">{_.get(recording, 'metadata.bbboriginservername', '')}</span><br />
                <Text code>Estado:</Text> <span className="consulta-font">{_.get(recording, 'state', '')}</span><br />
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

      this.setState({
        exists: true,
      });
    }
  }

  okModal = () => {
    this.props.handleModal();
    this.setState({exists: false });
  }
}
export default ModalRecord;