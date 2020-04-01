import React, { Component } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import { Table, Button, Popconfirm, message, Card } from 'antd';
import { DesktopOutlined, ReloadOutlined } from '@ant-design/icons';
import * as tools from '../../globalComponents/api_calls/index';
import ModalSala from './modalSala';

class Salas extends Component {
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
      creating: false,
      visibleModal: false,
      sala: null,
      act: false,
    };
  }

  render() {
    const { salas, loadingsalas, visibleModal, sala } = this.state;
    
    const columns = [{
      title: 'Nombre de sala',
      dataIndex: 'meetingName',
      key: 'meetingName',

    }, {
      title: 'Fecha y hora',
      dataIndex: 'createTime',
      key: 'createTime',
    }, {
      title: 'attendeePW',
      dataIndex: 'attendeePW',
      key: 'attendeePW',
    }, {
      title: 'moderatorPW',
      dataIndex: 'moderatorPW',
      key: 'moderatorPW',
    }, {
      title: 'Activa',
      dataIndex: 'running',
      key: 'running',
      render: data => {
        // eslint-disable-next-line
        if (data == 'true') return 'Si'
        // eslint-disable-next-line
        if (data == 'false') return 'No'
        // eslint-disable-next-line
        return data;     
      }
    }, {
      title: 'Acciones',
      key: 'acciones',
      render: item => {
        return (
          <div>
            <Button
              onClick={() => this.consultarSala(item)}>
              Consultar
              </Button>
            <Popconfirm
              onConfirm={() => this.handleEliminar(item)}
              title="Seguro desea cerrar la sala?" okText="Confirmar" cancelText="Cancelar">
              <Button>
                Cerrar
                </Button>
            </Popconfirm>
          </div>
        );
      }
    }
    ];
    return (
      <div>
        <Card title="Salas" extra={<DesktopOutlined />}>
          <Button
            type='primary'
            icon= {<ReloadOutlined />}
            style={{marginBottom: '10px'}}
            onClick={this.handleRequest}>
            Actualizar
        </Button>          
            <Table
              columns={columns}
              pagination={{ pageSize: 5 }}
              dataSource={salas}
              loading={loadingsalas}
              scroll={{ x: true }}
              rowKey='createTime'
              bordered
              locale={{ emptyText: "No hay salas" }} />

            <ModalSala
              visibleModal={visibleModal}
              sala={sala}
              handleModal={this.closeModal} />
        </Card>
      </div>

    );
  }
  handleRequest = async () => {
    var resultado;
    await axios.get(tools.getMeetings())
      .then((response) => {
        parseString(response.data, function (err, result) {
          resultado = result.response.meetings[0].meeting;
        });
      }
      );
    this.setState({ salas: resultado, loadingsalas: false });
    return message.success("Salas Actualizadas.");
  }

  handleEliminar = async (sala) => {
    var resultado;
    await axios.get(tools.endMeeting(sala))
      .then((response) => {
        parseString(response.data, function (err, result) {
          resultado = result.response;
          if (resultado.returncode[0] === 'SUCCESS') {
            message.success('Sala cerrada con éxito. Actualice la lista en unos segundos.');
          } else {
            message.error(resultado.messageKey[0]);
          }
        });
      }
      );
  }

  closeModal = () => {
    this.setState({
      visibleModal: false
    });
  }


  consultarSala = (sala) => {
    this.setState({ visibleModal: true, sala: sala });
  }

  handleModal = () => {
    this.setState({
      visible: !this.state.visibleModal,
    });
  }

  componentDidMount = async () => {
    await axios.get('http://bbblisandro.duckdns.org/bigbluebutton/api/create?allowStartStopRecording=true&attendeePW=ap&autoStartRecording=false&meetingID=2&moderatorPW=1234&name=2&record=false&voiceBridge=72668&welcome=%3Cbr%3EWelcome+to+%3Cb%3E%25%25CONFNAME%25%25%3C%2Fb%3E%21&checksum=9b87d8248888eb7bd1add180b648daa5d6305ec6');
    await axios.get('http://bbblisandro.duckdns.org/bigbluebutton/api/create?allowStartStopRecording=true&attendeePW=ap&autoStartRecording=false&meetingID=3&moderatorPW=1234&name=3&record=false&voiceBridge=72668&welcome=%3Cbr%3EWelcome+to+%3Cb%3E%25%25CONFNAME%25%25%3C%2Fb%3E%21&checksum=6f91536bd13c005f61259a3192498156a0690bd4');
    await axios.get('http://bbblisandro.duckdns.org/bigbluebutton/api/create?allowStartStopRecording=true&attendeePW=ap&autoStartRecording=false&meetingID=4&moderatorPW=1234&name=4&record=false&voiceBridge=72668&welcome=%3Cbr%3EWelcome+to+%3Cb%3E%25%25CONFNAME%25%25%3C%2Fb%3E%21&checksum=0d1a6e04fb92e0227b38fa474a047cd676c009c0');
    this.handleRequest();
  }
}

export default Salas;