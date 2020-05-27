import React, { Component } from 'react'
import { Row, Col, message } from 'antd';
import axios from 'axios';
import { url } from '../../utils/Url';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../Login/Login.css';

import Logo from '../../images/logo_comunidades_login.png'

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: '',
        password: '',
      },
      loading: false,
    };
  }

  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!!currentUser) {
      this.props.history.push('/');
    }
  }

  render() {
    const { loading } = this.state;

    return (
      <Row className="login">
        <Col lg={6} md={8} sm={8} xs={14}>
          <Row className="logo-login-unr">
            <Col>
              <img
                src={Logo}
                alt='logo-unr-login'
                className='login-logo' />
            </Col>
          </Row>
          <Form
            name="normal_login"
            onSubmitCapture={this.handleSubmit}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Ingrese nombre de usuario.',
                },
              ]}
            >
              <Input
                name="username"
                onChange={(e) => this.handleChange(e)}
                prefix={<UserOutlined />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Ingrese contraseña.',
                },
              ]}
            >
              <Input.Password
                name="password"
                onChange={(e) => this.handleChange(e)}
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
                Iniciar Sesión
              </Button>
            </Form.Item>
          </Form>
          <div className="login-footer">
            <p>Panel de Control BigBlueButton. Lincesed under the MIT license.</p>
          </div>
        </Col>
      </Row>
    )
  }

  handleSubmit = () => {
    const { form } = this.state;
    if (!!form.username && !!form.password)
      this.handleLogin();
  }

  handleLogin = async () => {
    const { form } = this.state;

    this.setState({ loading: true });

    try {
      const res = await axios.post(`${url}/api/usuarios/authenticate`, form);

      if (!!res.data) {
        localStorage.setItem('currentUser', JSON.stringify(res.data));
        return this.props.history.push('/');
      }

    } catch (error) {
      let messageError = 'Ha ocurrido un error.';
      if (error.response) {
        messageError = error.response.data.message;
      }
      message.error(messageError);
    }

    this.setState({ loading: false });
  }

  handleChange = (e) => {
    let form = this.state.form;
    form[e.target.name] = e.target.value;
    this.setState({ form: form })
  }
}

export default Login;