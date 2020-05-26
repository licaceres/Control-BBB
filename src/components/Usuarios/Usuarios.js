import React, { Component } from 'react';
import { Table, Button, Popconfirm, message, Card, Tooltip, Empty } from 'antd';
import { TeamOutlined, ReloadOutlined, CloseCircleOutlined, ZoomInOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { getHeader } from '../../utils/Header';
import { url } from '../../utils/Url';

class Usuarios extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usuarios: '',
      loadingUsuarios: true,
    }
  }


  render() {

    const { usuarios, loadingUsuarios } = this.state;

    const columns = [{
      title: 'Usuario',
      dataIndex: 'username',
      key: 'username'
    }, {
      title: 'Rol',
      dataIndex: 'rol',
      key: 'rol'
    }, {
      title: 'Apellido y Nombre',
      dataIndex: 'fullName',
      key: 'fullName'
    }, {
      title: 'Sector',
      dataIndex: 'nombreSector',
      key: 'nombreSector'
    }, {
      title: 'Dependencia',
      dataIndex: 'dependencia',
      key: 'dependencia'
    }, {
      title: 'Estado Cuenta',
      dataIndex: 'estadoCuenta',
      key: 'estadoCuenta',
    }
    ];

    return (
      <div>
        <Card bordered={false} title={<span style={{ fontSize: '1.2em' }}>Usuarios</span>} extra={<TeamOutlined />}>
          <Button
            type='primary'
            icon={<ReloadOutlined />}
            style={{ marginBottom: '10px' }}
            onClick={this.handleRequest}>
            Actualizar
          </Button>
          {loadingUsuarios ? <Empty description="No hay datos" />
            :
            <Table
              columns={columns}
              pagination={{ pageSize: 10 }}
              dataSource={usuarios}
              loading={loadingUsuarios}
              rowKey='fullName'
              size='small'
              locale={{ emptyText: "No hay usuarios" }} />
          }
        </Card>
      </div>
    );
  }

  handleRequest = async () => {
    var resultado;
    try {
      await axios.get(url + `/api/usuarios`, getHeader())
        .then((response) => {
          resultado = response.data;
          this.setState({ usuarios: resultado, loadingUsuarios: false });
          return message.success("Usuarios Actualizados.");
        })
        .catch((error) => {
          return message.success("No hay datos.");
        })
    }
    catch (error) {
      console.error(error);
    }
  }

  componentDidMount = async () => {
    this.handleRequest();
  }

}

export default Usuarios;