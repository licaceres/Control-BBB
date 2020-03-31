import React, { Component } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import { Col, Table, Divider, Button, Popconfirm, message } from 'antd';
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
        console.log(data);
        if (data === 'true') return 'Sí'
        if (data === 'false') return 'No'
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
        <Button
          type='primary'
          //icon='plus-circle'
          onClick={this.handleRequest}>
          Actualizar
        </Button>

        <Divider />

        <Col xs={{ span: 24 }} lg={{ span: 24, offset: 1 }}>
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

        </Col>
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

  componentDidMount() {
    this.handleRequest();
  }
}

export default Salas;