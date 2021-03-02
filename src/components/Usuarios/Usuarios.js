/*
* Componente Usuarios, ABM de usuarios
*/

import React, { Component } from 'react';
import { Table, Button, Popconfirm, message, Card, Tooltip, Empty } from 'antd';
import { TeamOutlined, ReloadOutlined, CloseCircleOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons';
import axios from 'axios';
import { getHeader } from '../../utils/Header';
import { url } from '../../utils/Url';
import UsuariosModal from '../Usuarios/Modal/UsuariosModal'

class Usuarios extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usuarios: '',
      loadingUsuarios: true,
      visible: false,
      creating: false,
      editando: false,
      usuario: null
    }
  }

  render() {

    const { usuarios, loadingUsuarios, visible, editando, usuario } = this.state;

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
    }, {
      title: 'Acciones',
      key: 'acciones',
      render: item => {
        return (
          <div>
            <Tooltip placement="top" title={'Editar'}>
              <Button
                style={{ marginLeft: '10px' }}
                type='primary'
                icon={<EditOutlined />}
                onClick={() => this.handleEditar(item)}>
              </Button>
            </Tooltip>
            <Popconfirm
              onConfirm={() => this.handleEliminar(item)}
              title="¿Seguro desea eliminar el usuario?" okText="Confirmar" cancelText="Cancelar">
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
        <Card bordered={false} title={<span style={{ fontSize: '1.2em' }}>Usuarios</span>} extra={<TeamOutlined />}>
          <Button
            type='primary'
            icon={<ReloadOutlined />}
            style={{ marginBottom: '10px' }}
            onClick={this.handleRequest}>
            Actualizar
          </Button>
          <Button
            type='primary'
            icon={<UserAddOutlined />}
            style={{ marginBottom: '10px', marginLeft: '10px' }}
            onClick={this.handleModal}>
            Nuevo Usuario
          </Button>
          {loadingUsuarios ? <Empty description="No hay datos" />
            :
            <Table
              columns={columns}
              pagination={{ pageSize: 10 }}
              dataSource={usuarios}
              loading={loadingUsuarios}
              rowKey='username'
              size='small'
              locale={{ emptyText: "No hay usuarios" }} />
          }
        </Card>

        <UsuariosModal
          visible={visible}
          handleModal={this.handleModal}
          crearUsuario={this.crearUsuario}
          editando={editando}
          usuario={usuario}
          editarUsuario={this.editarUsuario}
        />
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

  componentDidMount() {
    this.handleRequest();
  }

  crearUsuario = async (form) => {
    try {
      this.setState({ creating: true });
      const res = await axios.post(url + `/api/usuarios/register`, form, getHeader());

      if (res.status === 200) {
        message.success('Usuario creado con exito!');
        this.handleModal();
      }
    } catch (error) {
      let messageError = 'Ha ocurrido un error';
      if (error.response) {
        messageError = error.response.data.message || 'Ha ocurrido un error';
      }

      message.error(messageError);
    }

    this.setState({ creating: false });
  }

  editarUsuario = async (form) => {
    try {
      this.setState({ editando: true });
      const res = await axios.put(url + `/api/usuarios/${form.id}`, form, getHeader());
      if (res.status === 200) {
        message.success('Usuario actualizado con éxito');
        this.handleRequest();
        this.handleModal();
      }
    } catch (error) {
      let messageError = 'Hubo un error';
      if (error.response) {
        messageError = error.response.data.message || 'Hubo un error';
      }

      message.error(messageError);
    }

    this.setState({ editando: false });
  }


  handleModal = () => {
    this.setState({
      visible: !this.state.visible,
      usuario: null
    });
  }
  
  handleEditar = (usuario) => {
    this.setState({
      visible: true,
      usuario: usuario
    });
  }

  handleEliminar = async (usuario) => {
    try{
      this.setState({ creating: true });
      const res = await axios.delete(url + `/api/usuarios/${usuario.id}`, getHeader());
      if (res.status === 200) {
        message.success('Usuario eliminado con éxito');
        this.handleRequest();
      }
    }catch(error) {
      let messageError = 'Hubo un error';
      if (error.response) {
        messageError = error.response.data.message || 'Hubo un error';
      }
      message.error(messageError);
    }
  }
}

export default Usuarios;