import React, { Component } from 'react';
import { Modal, Form, message, Select, Row, Col, Checkbox } from 'antd';
import * as Yup from 'yup';
import { omit } from 'lodash';
import { FormItem } from '../../../utils/FormItem';
import { getHeader } from '../../../utils/Header';
import { url } from '../../../utils/Url';
import axios from 'axios';

const validateSchema = Yup.object().shape({

  username: Yup.string()
    .required('Campo requerido.'),

  idSector: Yup.string()
    .required('Campo requerido.'),

  idRol: Yup.string()
    .required('Campo requerido.'),

  apellido: Yup.string()
    .required('Campo requerido.'),

  nombre: Yup.string()
    .required('Campo requerido.'),

});

class UsuariosModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sectores: [],
      rols: [],

      form: {
        id: '',
        username: '',
        password: '',
        idRol: '',
        apellido: '',
        nombre: '',
        idSector: '',
        estado: false
      },
      errors: {}
    }
  }

  componentDidMount() {
    this.getSectores();
    this.getRols();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.visible && this.props.visible) {
      if (!!this.props.usuario) {
        this.setState({
          form: {
            ...this.props.usuario,
            password: ''
          }
        });
      } else {
        this.reset();
      }
    }
  }

  reset = () => {
    this.setState({
      form: {
        id: '',
        username: '',
        password: '',
        idRol: '',
        apellido: '',
        nombre: '',
        idSector: '',
        estado: false
      }
    });
  }

  render() {
    const { visible, handleModal, creating, editando, usuario } = this.props;
    const { form, errors, sectores, rols } = this.state;

    return (
      <Modal
        title={!!usuario ? 'Editar usuario' : 'Nuevo usuario'}
        visible={visible}
        onOk={this.handleSubmit}
        okText='Confirmar'
        okButtonProps={{
          loading: creating || editando,
          disabled: creating || editando
        }}
        onCancel={handleModal}
        cancelButtonProps={{ disabled: creating || editando }}
        cancelText='Cancelar'
        width='80%'>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}>
          <Row>


            <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ paddingLeft: 5, paddingRight: 5 }}>
              <FormItem
                label='Apellido'
                name='apellido'
                placeholder='Apellido'
                value={form.apellido}
                error={errors.apellido}
                onChange={this.onChange} />
            </Col>

            <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ paddingLeft: 5, paddingRight: 5 }}>
              <FormItem
                label='Nombre'
                name='nombre'
                placeholder='Nombre'
                value={form.nombre}
                error={errors.nombre}
                onChange={this.onChange} />
            </Col>

            <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ paddingLeft: 5, paddingRight: 5 }}>
              <FormItem
                label='Usuario'
                name='username'
                placeholder='Usuario'
                value={form.username}
                error={errors.username}
                onChange={this.onChange} />
            </Col>

            <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ paddingLeft: 5, paddingRight: 5 }}>
              <FormItem
                label='Contraseña'
                name='password'
                placeholder='Contraseña'
                value={form.password}
                error={errors.password}
                onChange={this.onChange} />
            </Col>

            <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ paddingLeft: 5, paddingRight: 5 }}>
              <Form.Item
                label='Sector'
                hasFeedback
                validateStatus={!!errors.idSector ? 'error' : null}
                help={errors.idSector}>
                <Select
                  size='large'
                  style={{ width: '100%' }}
                  value={form.idSector}
                  onChange={value => this.onChange(value, 'idSector')}>
                  {
                    sectores.map((sector, index) => {
                      return (
                        <Select.Option
                          key={index}
                          value={sector.idSector}>
                          {sector.nombre} [{sector.dependencia}]
                        </Select.Option>
                      );
                    })
                  }
                </Select>
              </Form.Item>
            </Col>


            <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ paddingLeft: 5, paddingRight: 5 }}>
              <Form.Item
                label='Rol'
                hasFeedback
                validateStatus={!!errors.idRol ? 'error' : null}
                help={errors.idRol}>
                <Select
                  size='large'
                  style={{ width: '100%' }}
                  value={form.idRol}
                  onChange={value => this.onChange(value, 'idRol')}>
                  {
                    rols.map((rol, index) => {
                      return (
                        <Select.Option
                          key={index}
                          value={rol.id}>
                          {rol.rol}
                        </Select.Option>
                      );
                    })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ paddingLeft: 5, paddingRight: 5 }}>
              <Form.Item
                name="estado" valuePropName="checked"
                style={{ marginLeft: '88px' }}
              >
                <Checkbox
                  checked={form.estado}
                  onChange={value => this.onChange(value, 'estado')}
                >Estado Cuenta (Activa/Desactiva)</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }

  handleSubmit = async () => {
    const { form, errors } = this.state;
    try {
      // VALIDO CON YUP
      await validateSchema.validate(form, { abortEarly: false });

      if (!!this.props.usuario) {
        return this.props.editarUsuario(form);
      }

      if (!form.password) {
        this.setState({
          errors: {
            ...errors,
            password: 'Password requerido'
          }
        })
        return message.error('Ingrese password')
      }
      form.id = '0';
      this.props.crearUsuario(form);
    } catch (error) {
      let errors = {};

      error.inner.forEach(error => {
        errors[error.path] = error.message;

      });

      this.setState({ errors });
    }
  }

  onChange = (value, key) => {
    const { errors, form } = this.state;
    // SI EL PARAM TIENE ERROR, LO BORRO
    if (errors[key]) {
      let _errors = omit(errors, key);
      this.setState({
        errors: _errors
      });
    }
    // CAMBIO STATE DEL PARAM
    this.setState({
      form: Object.assign({}, form, {
        [key]: value
      })
    });
  }

  getSectores = async () => {
    try {
      const res = await axios.get(url + `/api/sectores/`, getHeader());
      this.setState({ sectores: res.data });
    } catch (error) { }
  }

  getRols = async () => {
    try {
      const res = await axios.get(url + `/api/roles/`, getHeader());
      this.setState({ rols: res.data });
    } catch (error) { }
  }
}

export default UsuariosModal;