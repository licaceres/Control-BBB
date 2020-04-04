import React, { Component } from 'react';
import { Row, Col, Button, Form, message, Card, Alert } from 'antd';
import { SaveOutlined, SettingOutlined } from '@ant-design/icons';
import { FormItem } from '../utils/FormItem';
import '../styles/main.css';


class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      url: 'http://bbblisandro.duckdns.org/bigbluebutton/api',
      clave: 'xrlUJJKyUVfQ26F6AYcU6oTEcP4OxAaGbq4Fj6IFvg'
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    localStorage.setItem('url', this.state.url);
    localStorage.setItem('clave', this.state.clave);
  }

  render() {
    const { url, clave } = this.state;

    return (
      <div>
        <Row justify="center">
          <Col span={24}>
            <Card title="Configuración" extra={<SettingOutlined />} style={{ width: '100%' }}>
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

                    <div className='btn-buscar'>
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
}

export default Main;