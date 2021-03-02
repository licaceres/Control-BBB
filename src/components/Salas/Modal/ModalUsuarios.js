/*
* Modal Ususarios, expone metadata relacionada con los usuarios de la sala. 
*/

import React, { Component } from 'react';
import axios from 'axios';
import { message, Modal, Button, Table } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { url } from '../../../utils/Url';
import { getHeader } from '../../../utils/Header';


class ModalUsuarios extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exists: false,
      loading: false,
      sala: '',
      loadingUsuarios: true,
    };
  }

  render() {
    const { visibleModal, loading } = this.props;
    const { exists, loadingUsuarios, sala } = this.state;
    const columns = [{
      title: 'Id',
      dataIndex: 'userID',
      key: 'userID',

    }, {
      title: 'Nombre y Apellido',
      dataIndex: 'fullName',
      key: 'fullName',
    }, {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
    }, {
      title: 'Presentador',
      dataIndex: 'isPresenter',
      key: 'isPresenter',
      render: data => {
        // eslint-disable-next-line
        if (data == 'true') return 'Si'
        // eslint-disable-next-line
        if (data == 'false') return 'No'
        // eslint-disable-next-line
        return data;
      }
    }, {
      title: 'Oyente',
      dataIndex: 'isListeningOnly',
      key: 'isListeningOnly',
      render: data => {
        // eslint-disable-next-line
        if (data == 'true') return 'Si'
        // eslint-disable-next-line
        if (data == 'false') return 'No'
        // eslint-disable-next-line
        return data;
      }
    }, {
      title: 'Voz act.',
      dataIndex: 'hasJoinedVoice',
      key: 'hasJoinedVoice',
      render: data => {
        // eslint-disable-next-line
        if (data == 'true') return 'Si'
        // eslint-disable-next-line
        if (data == 'false') return 'No'
        // eslint-disable-next-line
        return data;
      }
    }, {
      title: 'Video',
      dataIndex: 'hasVideo',
      key: 'hasVideo',
      render: data => {
        // eslint-disable-next-line
        if (data == 'true') return 'Si'
        // eslint-disable-next-line
        if (data == 'false') return 'No'
        // eslint-disable-next-line
        return data;
      }
    }, {
      title: 'Cliente',
      dataIndex: 'clientType',
      key: 'clientType',
    }
    ];
    if (exists) {
      return (
        <Modal
          title={'Usuarios'}
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
          width='95%'>
          <div>
            <Button
              type='primary'
              icon={<ReloadOutlined />}
              style={{ marginBottom: '10px' }}
              onClick={this.handleRequest}>
              Actualizar
        </Button>
            <Table
              columns={columns}
              pagination={{ pageSize: 5 }}
              dataSource={sala}
              loading={loadingUsuarios}
              rowKey='userID'
              size='small'
              locale={{ emptyText: "No hay usuarios" }} />
          </div>
        </Modal>
      );
    } else {
      return null;
    }
  }

  componentDidUpdate = async () => {
    if (this.props.visibleModal && !this.state.exists) {
      var resultado = await axios.post(url + '/api/salas/getmeetinginfo',this.props.sala, getHeader());
      if (_.get(resultado.data, 'returncode', '') !== 'SUCCESS') {
        return message.error(_.get(resultado.data, 'messageKey', ''));
      }
      this.setState({
        exists: true,
        loadingUsuarios: false,        
        sala: _.get(resultado.data, 'attendees.attendee', '')//resultado.attendees[0].attendee,
      });
    }
  }
  okModal =() => {
    this.props.handleModal();
    this.setState({exists: false, sala: ''});
  }
}

export default ModalUsuarios;