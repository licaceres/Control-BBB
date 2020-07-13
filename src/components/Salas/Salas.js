import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Popconfirm, message, Card, Tooltip, Empty } from 'antd';
import { DesktopOutlined, ReloadOutlined, CloseCircleOutlined, ZoomInOutlined, UserOutlined } from '@ant-design/icons';
import ModalSala from '../Salas/Modal/ModalSala';
import ModalUsuarios from '../Salas/Modal/ModalUsuarios';
import _ from 'lodash';
import { url } from '../../utils/Url';

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
        <Card bordered={false} title={<span style={{fontSize: '1.2em'}}>Salas</span>} extra={<DesktopOutlined />}>
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
    try {
      resultado = await axios.get(url + `/api/salas/nowsalas`);
      resultado = resultado.data.meetings.meeting;
      this.setState({salas: resultado, loadingsalas: false})
        console.log(resultado);
    }
    catch (error) {
      console.error(error);
    }
  }

  handleEliminar = async (sala) => {
    var resultado;
    resultado = await axios.get(url + `/api/salas/endmeeting`, sala);
    resultado = resultado.response;
    if (_.get(resultado, 'returncode[0]', '') === 'SUCCESS') {
      message.success('Sala cerrada con éxito. Actualice la lista en unos segundos.');
    } else {
      message.error(resultado.messageKey[0]);
    }
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
    console.log(this.state.visibleModalUsr);
  }

  componentDidMount = async () => {
    this.handleRequest();
  }
}

export default Salas;