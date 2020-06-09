import React, { Component } from 'react';
import { Row, Col, Button, Form, message, Card, Alert, InputNumber } from 'antd';
import { SaveOutlined, SettingOutlined } from '@ant-design/icons';
import { FormItem } from '../../utils/FormItem';
import axios from 'axios';
import { getHeader } from '../../utils/Header';
import { url } from '../../utils/Url';

import './settingserver.css';

class SettingServer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        id: 1,
        nombreServerBbb: '',
        servidorPrincipal: true,
        urlServerBbb: '',
        secretSharedBbb: '',
        timerConsulta: ''
      }
    };
  }

  render() {
    const { form } = this.state;

    return (
      <div>
        <Row justify="center">
          <Col span={24}>
            <Card bordered={false} title={<span style={{ fontSize: '1.2em' }}>Configuración</span>} extra={<SettingOutlined />} style={{ width: '100%' }}>
              <Row>
                <Col span={16} offset={4}>
                  <Alert message="Servidor: BigBlueButton" type="info" style={{ marginBottom: '30px' }} />
                </Col>
              </Row>
              <Row>
                <Col span={16} offset={4}>
                  <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    onSubmitCapture={this.handleSubmit}>

                    <FormItem
                      key='nombreServerBbb'
                      label='Nombre Serv.:'
                      name='nombreServerBbb'
                      placeholder={'nombreServerBbb'}
                      value={form.nombreServerBbb}
                      error={null}
                      onChange={this.onChange}/>
                      
                    <FormItem
                      key='urlServerBbb'
                      label='URL:'
                      name='urlServerBbb'
                      placeholder={'Url'}
                      value={form.urlServerBbb}
                      error={null}
                      onChange={this.onChange} />

                    <FormItem
                      key='secretSharedBbb'
                      label='Clave:'
                      name='secretSharedBbb'
                      placeholder={'Clave'}
                      value={form.secretSharedBbb}
                      error={null}
                      onChange={this.onChange} />

                    <Form.Item label="Minutos">
                      <InputNumber 
                        key='timerConsulta'
                        name='timerConsulta'
                        min={1}
                        max={60}
                        value={form.timerConsulta}
                        onChange={value => this.onChange(value, 'timerConsulta')}
                      />
                    </Form.Item>

                    <div className='btn-buttons'>
                      {/* <Button
                        htmlType='button'
                        type='secondary'
                        style={{ marginRight: '10px' }}
                        onClick={this.limpiarCampos}
                        icon={<CloseCircleOutlined />}>
                        Limpiar
                      </Button> */}

                      <Button
                        htmlType='submit'
                        type='primary'
                        icon={<SaveOutlined />}>
                        Guardar
                      </Button>
                    </div>
                  </Form>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  componentDidMount = async () => {
    var resultado = await axios.get(url + `/api/dataconfig`, getHeader());
    this.setState({
      form: {
        id: 1,
        nombreServerBbb: resultado.data.nombreServerBbb,
        servidorPrincipal: true,
        urlServerBbb: resultado.data.urlServerBbb,
        secretSharedBbb: resultado.data.secretSharedBbb,
        timerConsulta: resultado.data.timerConsulta
      }
    })
    console.log(this.state);
  }

  onChange = (value, key) => {
    let form = this.state.form
    if (key === 'timerConsulta')
      value = Number(value);
    form[key] = value;
    this.setState({ form: form })
  }

  handleSubmit = async (event) => {
    if (!!event) event.preventDefault();
    const { form } = this.state;
    console.log(form);
    if (!form.urlServerBbb || !form.secretSharedBbb || !form.timerConsulta) {
      return message.warning('Complete el formulario.');
    } else {

      try {
        console.log(form);
        const res = await axios.put(url + `/api/dataconfig`, form, getHeader());
        if (res.status === 200) {

          localStorage.setItem('url', form.urlServerBbb);
          localStorage.setItem('clave', form.secretSharedBbb);
          message.success('Datos almacenados.')
        } else {
          message.error('Error de comunicación con Backend.')
        }
      } catch (error) {
        let messageError = 'Hubo un error';
        if (error.response) {
          messageError = error.response.data.message || 'Hubo un error';
        }
        message.error(messageError);
      }
    }
  }

  limpiarCampos = () => {
    this.setState({
      form: {
        id: 1,
        urlServerBbb: '',
        servidorPrincipal: true,
        secretSharedBbb: '',
        timerConsulta: ''
      }
    })
  }
}

export default SettingServer;