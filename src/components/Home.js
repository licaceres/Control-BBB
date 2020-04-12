import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  DatabaseOutlined
} from '@ant-design/icons';
import '../styles/home.css';

import Main from './Main';
import Info from './Info';
import Salas from './Salas';
import Servidor from './Servidor';
import LogoComunidades from '../images/logo-comunidades-unr.png';
import LogoUnr from '../images/logo-unr.png';
import LogoBbb from '../images/logo-bbb.png';

const { Content, Sider, Header } = Layout;

class Home extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo-comunidades" hidden={this.state.collapsed}>
              <img src={LogoComunidades} alt='logo-comunidades' className='logo-comunidades-size' />
            </div>
            <div className="logo-unr" hidden={!this.state.collapsed}>
              <img src={LogoUnr} alt='logo-unr' className='logo-unr-size' />
            </div>
            <Menu theme="dark" style={{backgroundColor: '#A82582'}} defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <SettingOutlined />
                <span style={{fontWeight: 'bold'}}>Configuración</span>
                <Link to="/" />
              </Menu.Item>
              <Menu.Item key="2">
                <InfoCircleOutlined />
                <span style={{fontWeight: 'bold'}}>Información</span>
                <Link to="/info" />
              </Menu.Item>
              <Menu.Item key="3">
                <DesktopOutlined />
                <span style={{fontWeight: 'bold'}}>Salas</span>
                <Link to="/salas" />
              </Menu.Item>
              <Menu.Item key="4">
                <DatabaseOutlined />
                <span style={{fontWeight: 'bold'}}>Servidor</span>
                <Link to="/servidor" />
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ paddingLeft: '16px', paddingRight: '35px' }}>
              <h3 style={{ fontWeight: 'bold', textAlign: 'right' }}>Panel de Control<span style={{ paddingLeft: '10px' }}><img src={LogoBbb} alt='logo-bbb' className="logo-bbb-size" /></span></h3>
            </Header>
            <Content style={{ margin: '16px' }}>
              <Route exact path="/" component={Main} />
              <Route exact path="/info" component={Info} />
              <Route exact path="/salas" component={Salas} />
              <Route exact path="/servidor" component={Servidor} />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Home;