import React, { Component } from 'react';
import { Table, Button, Popconfirm, message, Card, Tooltip, Empty } from 'antd';
import { ReloadOutlined, CloseCircleOutlined, EditOutlined, ApartmentOutlined } from '@ant-design/icons';
import axios from 'axios';
import { getHeader } from '../../utils/Header';
import { url } from '../../utils/Url';
import SectoresModal from '../Sectores/Modal/SectoresModal'

class Sectores extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sectores: '',
      loadingSectores: true,
      visible: false,
      creating: false,
      editando: false,
      sector: null
    }
  }

  render() {

    const { sectores, loadingSectores, visible, editando, sector } = this.state;

    const columns = [{
      title: 'Sector',
      dataIndex: 'nombre',
      key: 'nombre'
    }, {
      title: 'Depedencia',
      dataIndex: 'dependencia',
      key: 'dependencia'
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
              title="¿Seguro desea eliminar el sector?" okText="Confirmar" cancelText="Cancelar">
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
        <Card bordered={false} title={<span style={{ fontSize: '1.2em' }}>Sectores</span>} extra={<ApartmentOutlined />}>
          <Button
            type='primary'
            icon={<ReloadOutlined />}
            style={{ marginBottom: '10px' }}
            onClick={this.handleRequest}>
            Actualizar
          </Button>
          <Button
            type='primary'
            icon={<ApartmentOutlined />}
            style={{ marginBottom: '10px', marginLeft: '10px' }}
            onClick={this.handleModal}>
            Nuevo Sector
          </Button>
          {loadingSectores ? <Empty description="No hay datos" />
            :
            <Table
              columns={columns}
              pagination={{ pageSize: 10 }}
              dataSource={sectores}
              loading={loadingSectores}
              rowKey='id'
              size='small'
              locale={{ emptyText: "No hay sectores" }} />
          }
        </Card>

        <SectoresModal
          visible={visible}
          handleModal={this.handleModal}
          crearSector={this.crearSector}
          editando={editando}
          sector={sector}
          editarSector={this.editarSector}
        />
      </div>
    );
  }

  handleRequest = async () => {
    var resultado;
    try {
      await axios.get(url + `/api/sectores`, getHeader())
        .then((response) => {
          resultado = response.data;
          this.setState({ sectores: resultado, loadingSectores: false });
          return message.success("Sectores Actualizados.");
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

  crearSector = async (form) => {
    try {
      this.setState({ creating: true });
      const res = await axios.post(url + `/api/sectores`, form, getHeader());

      if (res.status === 200) {
        message.success('Sector creado con exito!');
        this.handleRequest();
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

  editarSector = async (form) => {
    try {
      this.setState({ editando: true });
      const res = await axios.put(url + `/api/sectores/${form.id}`, form, getHeader());
      if (res.status === 200) {
        message.success('Sector actualizado con éxito');
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
      sector: null
    });
  }
  
  handleEditar = (sector) => {
    this.setState({
      visible: true,
      sector: sector
    });
  }

  handleEliminar = async (sector) => {
    try{
      this.setState({ creating: true });
      const res = await axios.delete(url + `/api/sectores/${sector.id}`, getHeader());
      if (res.status === 200) {
        message.success('Sector eliminado con éxito');
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

export default Sectores;