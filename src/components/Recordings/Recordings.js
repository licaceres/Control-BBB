import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Popconfirm, message, Card, Tooltip, Empty, Input, Space } from 'antd';
import { DesktopOutlined, ReloadOutlined, CloseCircleOutlined, ZoomInOutlined, CaretRightOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
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
      searchText: '',
      searchedColumn: '',
      pagination: {
        defaultPageSize: 5
      },
    };
  }

  render() {
    const { recordings, loadingrec, visibleModal, recording, visibleModalUsr, pagination } = this.state;

    const columns = [{
      title: 'Nombre de sala',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...this.getColumnSearchProps('name'),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend']
    }, {
      title: 'Tamaño en bytes',
      dataIndex: 'size',
      key: 'size',
      width: '30%',
      sorter: (a, b) => a.size - b.size,
      sortDirections: ['descend', 'ascend']
    },{
      title: 'Fecha y hora',
      dataIndex: 'startTime',
      key: 'startTime',
      
      sorter: (a, b) => a.startTime - b.startTime,
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder: 'descend',
      render: data => {
        // eslint-disable-next-line
        return(
          moment(parseFloat(data)).format('DD/MM/YYYY HH:MM').toString()
        )
      }
    }, {
      title: 'Participantes',
      dataIndex: 'participants',
      key: 'participants',
      sorter: (a, b) => a.participants.length - b.participants.length,
      sortDirections: ['descend', 'ascend']
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
              pagination={ pagination }
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

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Buscar`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Limpiar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

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