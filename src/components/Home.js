import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  SettingOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import '../styles/home.css';

import Main from './Main';
import Estadistica from './Estadistica';
import LogoComunidades from '../images/logo-comunidades-unr.png';
import LogoUnr from '../images/logo-unr.png';
import LogoBbb from '../images/logo-bbb.jpg';

const { Content, Sider, Header } = Layout;
const { SubMenu } = Menu;

class Home extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
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
              <img src={LogoUnr} alt='logo-unr' className='logo-unr-size'/>
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <SettingOutlined />
                <span>Configuración</span>
                <Link to="/" />
              </Menu.Item>
              <Menu.Item key="2">
                <DesktopOutlined />
                <span>Estadísticas</span>
                <Link to="/estadistica" />
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <UserOutlined />
                    <span>User</span>
                  </span>
                }
              >
                <Menu.Item key="3">Tom</Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <TeamOutlined />
                    <span>Team</span>
                  </span>
                }
              >
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
              </SubMenu>
              <Menu.Item key="9">
                <FileOutlined />
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
          <Header className="site-layout-background" style={{ paddingLeft: '16px', paddingRight: '35px' }}>
              <h3 style={{fontWeight: 'initial', textAlign: 'right'}}>[ Panel de Control ]<span style={{paddingLeft: '10px' }}><img src={LogoBbb} alt='logo-bbb' className="logo-bbb-size"/></span></h3>
          </Header>
            <Content style={{ margin: '16px' }}>
                <Route exact path="/" component={ Main } />
                <Route exact path="/estadistica" component={ Estadistica } />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Home;