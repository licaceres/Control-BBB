import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  LineChartOutlined,
  UserOutlined,
  TeamOutlined,
  ApartmentOutlined
} from '@ant-design/icons';
import './MainMenu.css';

import SettingServer from '../SettingServer/SettingServer';
import Info from '../Info/Info';
import Salas from '../Salas/Salas';
import Estadisticas from '../Estadisticas/Estadisticas';
import Usuarios from '../Usuarios/Usuarios';
import Sectores from '../Sectores/Sectores';
import { PrivateRoute } from '../../utils/PrivateRoute';

import LogoComunidades from '../../images/logo-comunidades-unr.png';
import LogoUnr from '../../images/logo-unr.png';
import LogoBbb from '../../images/logo-bbb.png';

const { Content, Sider, Header } = Layout;


class MainMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: '',
      collapsed: false,
    };
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  handleLinkClick = (route) => {
    this.props.history.push(route);
  }

  logOut = () => {
    localStorage.clear();
    window.location.reload();
  }

  componentDidMount() {
    this.setState({
      currentUser: JSON.parse(localStorage.getItem('currentUser'))
    })
  }

  menuAdmin = () => {
    return (
      <Menu theme="dark" style={{ backgroundColor: '#A82582' }} defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" onClick={() => this.handleLinkClick('/settingserver')}>
          <SettingOutlined />
          <span style={{ fontWeight: 'bold' }}>Configuración</span>
        </Menu.Item>
        <Menu.Item key="2" onClick={() => this.handleLinkClick('/info')}>
          <InfoCircleOutlined />
          <span style={{ fontWeight: 'bold' }}>Información</span>
        </Menu.Item>
        <Menu.Item key="3" onClick={() => this.handleLinkClick('/salas')}>
          <DesktopOutlined />
          <span style={{ fontWeight: 'bold' }}>Salas</span>
          <Link to="/salas" />
        </Menu.Item>
        <Menu.Item key="4" onClick={() => this.handleLinkClick('/estadisticas')}>
          <LineChartOutlined />
          <span style={{ fontWeight: 'bold' }}>Estadísticas</span>
          <Link to="/estadisticas" />
        </Menu.Item>
        <Menu.Item key="5" onClick={() => this.handleLinkClick('/usuarios')}>
          <TeamOutlined />
          <span style={{ fontWeight: 'bold' }}>Usuarios</span>
        </Menu.Item>
        <Menu.Item key="6" onClick={() => this.handleLinkClick('/sectores')}>
          <ApartmentOutlined />
          <span style={{ fontWeight: 'bold' }}>Sectores</span>
        </Menu.Item>
        <Menu.Item key="7" onClick={() => this.logOut()}>
          <UserOutlined />
          <span style={{ fontWeight: 'bold' }}>Cerrar Sesión</span>
        </Menu.Item>
      </Menu>
    )
  }

  menuUser = () => {
    return (
      <Menu theme="dark" style={{ backgroundColor: '#A82582' }} defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" onClick={() => this.handleLinkClick('/settingserver')}>
          <SettingOutlined />
          <span style={{ fontWeight: 'bold' }}>Configuración</span>
        </Menu.Item>
        <Menu.Item key="2" onClick={() => this.handleLinkClick('/info')}>
          <InfoCircleOutlined />
          <span style={{ fontWeight: 'bold' }}>Información</span>
        </Menu.Item>
        <Menu.Item key="3" onClick={() => this.handleLinkClick('/salas')}>
          <DesktopOutlined />
          <span style={{ fontWeight: 'bold' }}>Salas</span>
        </Menu.Item>
        <Menu.Item key="4" onClick={() => this.handleLinkClick('/estadisticas')}>
        <LineChartOutlined />
          <span style={{ fontWeight: 'bold' }}>Estadísticas</span>
          <Link to="/estadísticas" />
        </Menu.Item>
        <Menu.Item key="5" onClick={() => this.logOut()}>
          <UserOutlined />
          <span style={{ fontWeight: 'bold' }}>Cerrar Sesión</span>
        </Menu.Item>
      </Menu>
    )
  }

  renderMenu = () => {
    switch (this.state.currentUser.idRol) {
      case 1:
        return (this.menuAdmin());
      case 2:
        return (this.menuUser());
      default:
        break;
    }
  }

  render() {
    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider style={{ backgroundColor: '#A82582' }} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo-comunidades" hidden={this.state.collapsed}>
              <img src={LogoComunidades} alt='logo-comunidades' className='logo-comunidades-size' />
            </div>
            <div className="logo-unr" hidden={!this.state.collapsed}>
              <img src={LogoUnr} alt='logo-unr' className='logo-unr-size' />
            </div>
            {this.renderMenu()}
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ paddingLeft: '16px', paddingRight: '35px' }}>
              <h3 style={{ fontWeight: 'bold', textAlign: 'right' }}>Panel de Control<span style={{ paddingLeft: '10px' }}><img src={LogoBbb} alt='logo-bbb' className="logo-bbb-size" /></span></h3>
            </Header>
            <Content style={{ margin: '16px' }}>
              <Switch>
                <PrivateRoute exact path="/" component={SettingServer} />
                <PrivateRoute exact path="/settingserver" roles={[1, 2]} component={SettingServer} />
                <PrivateRoute exact path="/info" roles={[1, 2]} component={Info} />
                <PrivateRoute exact path="/salas" roles={[1, 2]} component={Salas} />
                <PrivateRoute exact path="/estadisticas" roles={[1, 2]} component={Estadisticas} />
                <PrivateRoute exact path="/usuarios" roles={[1]} component={Usuarios} />
                <PrivateRoute exact path="/sectores" roles={[1]} component={Sectores} />
                <Route path="/404" component={SettingServer} />
                <Redirect to="/" />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default MainMenu;