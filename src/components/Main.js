import React, { Component } from 'react';
import { Row, Col, Button, Form, message, Card, Alert } from 'antd';
import { SaveOutlined, SettingOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { FormItem } from '../utils/FormItem';
import '../styles/main.css';


class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      url: 'http://bbblisandro.duckdns.org/bigbluebutton/api',
      clave: 'TM6I5tVVENQOLespdftbHQhF3M2SMYToOP7F4otJAc'
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.limpiarCampos = this.limpiarCampos.bind(this);
    localStorage.setItem('url', this.state.url);
    localStorage.setItem('clave', this.state.clave);
  }

  render() {
    const { url, clave } = this.state;

    return (
      <div>
        <Row justify="center">
          <Col span={24}>
            <Card bordered={false} title={<span style={{fontSize: '1.2em'}}>Configuración</span>} extra={<SettingOutlined />} style={{ width: '100%' }}>
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
                      key='url'
                      label='URL Server:'
                      name='url'
                      placeholder='Ingrese'
                      value={url}
                      error={null}
                      onChange={this.onChange} />

                    <FormItem
                      key='clave'
                      label='Clave:'
                      name='clave'
                      placeholder='Ingrese'
                      value={clave}
                      error={null}
                      onChange={this.onChange} />

                    <div className='btn-buttons'>
                    <Button
                        htmlType='button'
                        type='secondary'
                        style={{marginRight: '10px'}}
                        onClick={this.limpiarCampos}
                        icon={<CloseCircleOutlined />}>
                        Limpiar
                      </Button>

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

  onChange(value, key) {
    this.setState({ [key]: value });
  }

  handleSubmit(event) {
    if (!!event) event.preventDefault();
    const { url, clave } = this.state;

    if (!url || !clave) {
      return message.warning('Complete el formulario.');
    } else {
      localStorage.setItem('url', url);
      localStorage.setItem('clave', clave);
      return message.success('Datos almacenados.')
    }
  }

  limpiarCampos() {
    this.setState({
      url: '',
      clave: ''
    })
  }
}

export default Main;