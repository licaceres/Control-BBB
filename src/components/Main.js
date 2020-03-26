import React, { Component, useState } from 'react';
import { Row, Col, Table, Button, Form, Divider, message, Card, Input } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { FormItem } from '../globalComponents';
import '../styles/main.css';


class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      url: '',
      clave: ''
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const { url, clave } = this.state;

    return (
      <div>
        <Row justify="center">
          <Col span={24}>
            <Card title="Control BigBlueButton" style={{ width: '100%' }} headStyle={{ fontWeight: 'bold', fontSize: '1.75em' }}>
              <Col span={18} offset={2}>
                <Form
                  labelCol={{span: 4}}
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
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  onChange(value, key) {
    this.setState({ [key]: value });
    console.log(value);
  }

  handleSubmit(event) {
    const { url, clave } = this.state;
    console.log(url);
    if (!!event) event.preventDefault();

    if (!url && !clave) {
      return message.warning('Complete el formulario para realizar la búsqueda.');
    }

    console.log(url);
    this.props.handleSubmit(url, clave);
  }
}

export default Main;