import React, { Component } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import { Col, Row, message, Modal } from 'antd';
import * as tools from '../../../globalComponents/api_calls/index';

class ModalSala extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      version: '',
      activas: '',
      usuarios: '',
      salaInfo: null,
      loading: false,
      loadingPeriodo: false,
    };
  }

  render() {
    const { visibleModal, handleModal, loading } = this.props;
    const { salaInfo } = this.state;
    if(salaInfo){
    return (
        <Modal
        title={salaInfo.meetingName[0]}
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
                Curso: {salaInfo.metadata[0]["bbb-context"][0]}<br/>
                Fecha: {salaInfo.createDate[0]}<br/>
                Pass Moderador: {salaInfo.moderatorPW[0]}<br/>
                Activa: {salaInfo.running[0]}<br/>
                Duración: {salaInfo.duration[0]}<br/>
                Grabando: {salaInfo.recording[0]}<br/>
                Participantes: {salaInfo.participantCount[0]}<br/>
                Oyentes: {salaInfo.listenerCount[0]}<br/>
                Cant. Max. Usuarios: {salaInfo.maxUsers[0]}<br/>
                Moderadores: {salaInfo.moderatorCount[0]}<br/>
                Usuario Creador: {salaInfo.metadata[0]["bn-userid"][0]}<br/>
                Server Origen: {salaInfo.metadata[0]["bbb-origin-server-name"][0]}<br/>
                Origen: {salaInfo.metadata[0]["bbb-origin"][0]}<br/>
          </Col>
        </Row>
      </div>
      </Modal>
    );
      }else{
        return null;
      }
    }

    componentDidUpdate = async () => {
      if(this.props.visibleModal && !this.state.salaInfo){
        var resultado = null;
       await axios.get(tools.getMeetingInfo(this.props.sala))
          .then((response) => {
              parseString(response.data, function (err, result) {
                  if(result.response.returncode[0] !== 'SUCCESS'){
                      return message.error(resultado.messageKey[0]);
                  }
                  resultado = result.response;


              });
          }
          );
        console.log(resultado);
        this.setState({ salaInfo: resultado });
        }
    }
}

export default ModalSala;