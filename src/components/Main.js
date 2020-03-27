import React, { Component } from 'react';
import { Row, Col, Button, Form, message, Card } from 'antd';
import { SaveOutlined, SettingOutlined} from '@ant-design/icons';
import { FormItem } from '../globalComponents';
import '../styles/main.css';


class Main extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      url: 'http://localhost:8000/bigbluebutton/api',
      clave: '8cd8ef52e8e101574e400365b55e11a6'
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
            <Card title="Configurar Servidor [ BigBlueButton ]" extra={<SettingOutlined />} style={{ width: '100%' }} headStyle={{ fontWeight: 'normal', fontSize: '1.5em' }}>
              <Col span={18} offset={1}>
                <Form
                  labelCol={{span: 8}}
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
  }

  handleSubmit(event) {
    if (!!event) event.preventDefault();
    const { url,  clave } = this.state;

    if (!url || !clave) {
      return message.warning('Complete el formulario.');
    }

    localStorage.setItem('url', url);
    localStorage.setItem('clave', clave);
  }
}

export default Main;