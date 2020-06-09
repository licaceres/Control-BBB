import React, { Component } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import { message, Modal, Button, Table } from 'antd';
import * as tools from '../../../utils/ApiCalls';
import { ReloadOutlined } from '@ant-design/icons';
import _ from 'lodash';

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
      console.log(exists, visibleModal);
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
      var resultado = null;
      await axios.get(tools.getMeetingInfo(this.props.sala))
        .then((response) => {
          parseString(response.data, function (err, result) {
            if (_.get(result.response, 'returncode[0]', '') !== 'SUCCESS') {
              return message.error(resultado.messageKey[0]);
            }

            resultado = result.response;
            console.log(resultado);

          });
        }
        );

      this.setState({
        exists: true,
        loadingUsuarios: false,        
        sala: resultado.attendees[0].attendee,
      });
      console.log(this.state.sala);
    }
  }
  okModal =() => {
    this.props.handleModal();
    this.setState({exists: false, sala: ''});
  }
}

export default ModalUsuarios;