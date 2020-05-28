import React, { Component } from 'react';
import { Modal, Form, Row, Col } from 'antd';
import * as Yup from 'yup';
import { omit } from 'lodash';
import { FormItem } from '../../../utils/FormItem';


const validateSchema = Yup.object().shape({

  nombre: Yup.string()
    .required('Campo requerido.'),

  dependencia: Yup.string()
    .required('Campo requerido.'),

});

class SectoresModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        id: '',
        nombre: '',
        dependencia: ''
      },
      errors: {}
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.visible && this.props.visible) {
      if (!!this.props.sector) {
        this.setState({
          form: {
            ...this.props.sector
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
        nombre: '',
        dependencia: ''
      }
    });
  }

  render() {
    const { visible, handleModal, creating, editando, sector } = this.props;
    const { form, errors } = this.state;

    return (
      <Modal
        title={!!sector ? 'Editar sector' : 'Nuevo sector'}
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
        width='50%'>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{ paddingLeft: 5, paddingRight: 5 }}>
              <FormItem
                label='Sector'
                name='nombre'
                placeholder='Sector'
                value={form.nombre}
                error={errors.nombre}
                onChange={this.onChange} />
            </Col>

            <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{ paddingLeft: 5, paddingRight: 5 }}>
              <FormItem
                label='Dependencia'
                name='dependencia'
                placeholder='Dependencia'
                value={form.dependencia}
                error={errors.dependencia}
                onChange={this.onChange} />
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }

  handleSubmit = async () => {
    const { form } = this.state;
    try {
      // VALIDO CON YUP
      await validateSchema.validate(form, { abortEarly: false });

      if (!!this.props.sector) {
        return this.props.editarSector(form);
      }

      form.id = 0;
      this.props.crearSector(form);
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
}

export default SectoresModal;