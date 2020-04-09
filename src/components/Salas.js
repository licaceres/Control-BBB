import React, { Component } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import { Table, Button, Popconfirm, message, Card, Tooltip, Empty } from 'antd';
import { DesktopOutlined, ReloadOutlined, CloseCircleOutlined, ZoomInOutlined, UserOutlined } from '@ant-design/icons';
import * as tools from '../utils/ApiCalls';
import ModalSala from './modals/ModalSala';
import ModalUsuarios from './modals/ModalUsuarios';

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
      visibleModalUsr: false,
      sala: null,
      act: false,
    };
  }

  render() {
    const { salas, loadingsalas, visibleModal, sala, visibleModalUsr } = this.state;

    const columns = [{
      title: 'Id Sala',
      dataIndex: 'meetingID',
      key: 'meetingID',
      width: '15%',
    }, {
      title: 'Nombre de sala',
      dataIndex: 'meetingName',
      key: 'meetingName',
      width: '30%'

    }, {
      title: 'Fecha y hora',
      dataIndex: 'createTime',
      key: 'createTime',
      render: data => {
        // eslint-disable-next-line
        var fh = new Date(parseFloat(data)).toISOString();
        return fh;
      }
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
      width: '15%',
      render: item => {
        return (
          <div>
            <Tooltip placement="topLeft" title={'Consultar'}>
              <Button
                type='primary'
                icon={<ZoomInOutlined />}
                onClick={() => this.consultarSala(item)}>
              </Button>
            </Tooltip>
            <Tooltip placement="top" title={'Usuarios'}>
              <Button
                style={{ marginLeft: '10px' }}
                type='primary'
                icon={<UserOutlined />}
                onClick={() => this.consultarUsuarios(item)}>
              </Button>
            </Tooltip>
            <Popconfirm
              onConfirm={() => this.handleEliminar(item)}
              title="¿Seguro desea cerrar la sala?" okText="Confirmar" cancelText="Cancelar">
              <Tooltip placement="topRight" title={'Cerrar Sala'}>
                <Button
                  style={{ marginLeft: '10px' }}
                  type='primary'
                  icon={<CloseCircleOutlined />}>
                </Button>
              </Tooltip>
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
            icon={<ReloadOutlined />}
            style={{ marginBottom: '10px' }}
            onClick={this.handleRequest}>
            Actualizar
          </Button>

          {loadingsalas ? <Empty description="No hay datos" />
            :
            <Table
              columns={columns}
              pagination={{ pageSize: 5 }}
              dataSource={salas}
              loading={loadingsalas}
              rowKey='createTime'
              size='small'
              locale={{ emptyText: "No hay salas" }} />
          }
          <ModalSala
            visibleModal={visibleModal}
            sala={sala}
            handleModal={this.closeModal} />
          <ModalUsuarios
            visibleModal={visibleModalUsr}
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
        })
        this.setState({ salas: resultado, loadingsalas: false });
        return message.success("Salas Actualizadas.");
      })
      .catch((error) => {
        return message.success("No hay datos.")
      })
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
      visibleModal: false,
      visibleModalUsr: false,
    });
  }


  consultarSala = (sala) => {
    this.setState({ visibleModal: true, sala: sala });
  }

  consultarUsuarios = (sala) => {
    this.setState({ visibleModalUsr: true, sala: sala });
  }

  handleModal = () => {
    this.setState({
      visible: !this.state.visibleModal,
    });
  }

  componentDidMount = async () => {
    await axios.get('http://bbblisandro.duckdns.org/bigbluebutton/api/create?allowStartStopRecording=true&attendeePW=ap&autoStartRecording=false&meetingID=1&moderatorPW=mp&name=1&record=false&voiceBridge=74471&welcome=%3Cbr%3EWelcome+to+%3Cb%3E%25%25CONFNAME%25%25%3C%2Fb%3E%21&checksum=c644e184daf32b2e2397e27d85c61b572dd394d6');
    await axios.get('http://bbblisandro.duckdns.org/bigbluebutton/api/create?allowStartStopRecording=true&attendeePW=ap&autoStartRecording=false&meetingID=2&moderatorPW=mp&name=2&record=false&voiceBridge=74471&welcome=%3Cbr%3EWelcome+to+%3Cb%3E%25%25CONFNAME%25%25%3C%2Fb%3E%21&checksum=b6266d5af0554d10e953ac8240dc8e8e19533b83');
    await axios.get('http://bbblisandro.duckdns.org/bigbluebutton/api/create?allowStartStopRecording=true&attendeePW=ap&autoStartRecording=false&meetingID=3&moderatorPW=mp&name=3&record=false&voiceBridge=74471&welcome=%3Cbr%3EWelcome+to+%3Cb%3E%25%25CONFNAME%25%25%3C%2Fb%3E%21&checksum=35a324b6d592bf1836bd7b4cc90466b932d1250c');
    this.handleRequest();
  }
}

export default Salas;