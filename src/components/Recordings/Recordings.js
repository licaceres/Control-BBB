import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Popconfirm, message, Card, Tooltip, Empty } from 'antd';
import { DesktopOutlined, ReloadOutlined, CloseCircleOutlined, ZoomInOutlined, CaretRightOutlined } from '@ant-design/icons';
import ModalRecord from '../Recordings/Modal/ModalRecord';
import ModalPlayback from './Modal/ModalPlayback';
import _ from 'lodash';
import { url } from '../../utils/Url';
import { getHeader } from '../../utils/Header';
import moment from 'moment';

class Recordings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      version: '',
      recordings: '',
      activas: '',
      loadingversion: true,
      loadingrec: true,
      loadingusuarios: true,
      creating: false,
      visibleModal: false,
      visibleModalUsr: false,
      recording: null,
      act: false,
    };
  }

  render() {
    const { recordings, loadingrec, visibleModal, recording, visibleModalUsr } = this.state;

    const columns = [{
      title: 'Nombre de sala',
      dataIndex: 'name',
      key: 'name',
      width: '30%'

    }, {
      title: 'Tamaño en bytes',
      dataIndex: 'size',
      key: 'size',
      width: '30%'

    },{
      title: 'Fecha y hora',
      dataIndex: 'startTime',
      key: 'startTime',
      render: data => {
        // eslint-disable-next-line
        return moment(parseFloat(data)).format('DD/MM/YYYY HH:MM').toString();
      }
    }, {
      title: 'Participantes',
      dataIndex: 'participants',
      key: 'participants',
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
                onClick={() => this.consultarRecord(item)}>
              </Button>
            </Tooltip>
            <Tooltip placement="top" title={'Play'}>
              <Button
                style={{ marginLeft: '10px' }}
                type='primary'
                icon={<CaretRightOutlined />}
                onClick={() => this.consultarPlayback(item)}>
              </Button>
            </Tooltip>
            <Popconfirm
              onConfirm={() => this.handleEliminar(item)}
              title="¿Seguro eliminar la grabación?" okText="Confirmar" cancelText="Cancelar">
              <Tooltip placement="topRight" title={'Eliminar'}>
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
        <Card bordered={false} title={<span style={{fontSize: '1.2em'}}>Grabaciones</span>} extra={<DesktopOutlined />}>
          <Button
            type='primary'
            icon={<ReloadOutlined />}
            style={{ marginBottom: '10px' }}
            onClick={this.handleRequest}>
            Actualizar
          </Button>

          {loadingrec ? <Empty description="No hay datos" />
            :
            <Table
              columns={columns}
              pagination={{ pageSize: 5 }}
              dataSource={recordings}
              loading={loadingrec}
              rowKey='startTime'
              size='small'
              locale={{ emptyText: "No hay grabaciones" }} />
          }
          <ModalRecord
            visibleModal={visibleModal}
            recording={recording}
            handleModal={this.closeModal} />
          <ModalPlayback
            visibleModal={visibleModalUsr}
            recording={recording}
            handleModal={this.closeModal} />
        </Card>
      </div>

    );
  }

  handleRequest = async () => {
    var resultado;
    try {
      resultado = await axios.get(url + `/api/recordings`,getHeader());
      resultado = resultado.data.recordings.recording;
      console.log(resultado);
      this.setState({recordings: resultado, loadingrec: false})
    }
    catch (error) {
      console.error(error);
    }
  }

  handleEliminar = async (rec) => {
    var resultado;
    console.log(rec);
    resultado = await axios.delete(url + `/api/recordings/${rec.recordID}`, getHeader());
    resultado = resultado.data;
    console.log(resultado);
    if (_.get(resultado, 'returncode', '') === 'SUCCESS') {
      message.success('Grabación eliminada con éxito. Actualice la lista en unos segundos.');
    } else {
      message.error(_.get(resultado, 'messageKey', ''));
    }
  }

  closeModal = () => {
    this.setState({
      visibleModal: false,
      visibleModalUsr: false,
  
    });
  }


  consultarRecord = (rec) => {
    this.setState({ visibleModal: true, recording: rec });
  }

  consultarPlayback = (rec) => {
    window.open(rec.playback.format.url)
    //this.setState({ visibleModalUsr: true, recording: rec });
  }

  componentDidMount = async () => {
    this.handleRequest();
  }
}

export default Recordings;