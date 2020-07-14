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
import './mainmenu.css';

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
      selected: '[/]'
    };
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  handleLinkClick = (route) => {
    this.props.history.push(route);
  }

  logOut = () => {
    sessionStorage.clear();
    window.location.reload();
  }

  componentDidMount() {
    this.setState({
      selected: [this.props.location.pathname],
      currentUser: JSON.parse(sessionStorage.getItem('currentUser'))
    })
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        selected: [this.props.location.pathname]
      });
    }
  }

  menuAdmin = () => {
    return (
      <Menu theme="dark" style={{ backgroundColor: '#A82582' }} selectedKeys={this.state.selected} mode="inline">
        <Menu.Item key="/info"  onClick={() => this.handleLinkClick('/info')}>
          <InfoCircleOutlined />
          <span style={{ fontWeight: 'bold' }}>Información</span>
        </Menu.Item>
        <Menu.Item key="/salas" onClick={() => this.handleLinkClick('/salas')}>
          <DesktopOutlined />
          <span style={{ fontWeight: 'bold' }}>Salas</span>
          <Link to="/salas" />
        </Menu.Item>
        <Menu.Item key="/estadisticas" onClick={() => this.handleLinkClick('/estadisticas')}>
          <LineChartOutlined />
          <span style={{ fontWeight: 'bold' }}>Estadísticas</span>
        </Menu.Item>
        <Menu.Item key={"/settingserver"} onClick={() => this.handleLinkClick('/settingserver')}>
          <SettingOutlined />
          <span style={{ fontWeight: 'bold' }}>Configuración</span>
        </Menu.Item>
        <Menu.Item key="/usuarios" onClick={() => this.handleLinkClick('/usuarios')}>
          <TeamOutlined />
          <span style={{ fontWeight: 'bold' }}>Usuarios</span>
        </Menu.Item>
        <Menu.Item key="/sectores" onClick={() => this.handleLinkClick('/sectores')}>
          <ApartmentOutlined />
          <span style={{ fontWeight: 'bold' }}>Sectores</span>
        </Menu.Item>
        <Menu.Item key="0" onClick={() => this.logOut()}>
          <UserOutlined />
          <span style={{ fontWeight: 'bold' }}>Cerrar Sesión</span>
        </Menu.Item>
      </Menu>
    )
  }

  menuUser = () => {
    return (
      <Menu theme="dark" style={{ backgroundColor: '#A82582' }} selectedKeys={this.state.selected} mode="inline">
        <Menu.Item key="/info" onClick={() => this.handleLinkClick('/info')}>
          <InfoCircleOutlined />
          <span style={{ fontWeight: 'bold' }}>Información</span>
        </Menu.Item>
        <Menu.Item key="/salas" onClick={() => this.handleLinkClick('/salas')}>
          <DesktopOutlined />
          <span style={{ fontWeight: 'bold' }}>Salas</span>
        </Menu.Item>
        <Menu.Item key="/estadisticas" onClick={() => this.handleLinkClick('/estadisticas')}>
        <LineChartOutlined />
          <span style={{ fontWeight: 'bold' }}>Estadísticas</span>
        </Menu.Item>
        <Menu.Item key="0" onClick={() => this.logOut()}>
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
              <h3 style={{ fontWeight: 'bold', textAlign: 'right' }}>[ Proyecto MONSA ] · Panel de Control<span style={{ paddingLeft: '10px' }}><img src={LogoBbb} alt='logo-bbb' className="logo-bbb-size" /></span></h3>
            </Header>
            <Content style={{ margin: '16px' }}>
              <Switch>
                <PrivateRoute exact path="/info" roles={[1, 2]} component={Info} />
                <PrivateRoute exact path="/settingserver" roles={[1]} component={SettingServer} />
                <PrivateRoute exact path="/salas" roles={[1, 2]} component={Salas} />
                <PrivateRoute exact path="/estadisticas" roles={[1, 2]} component={Estadisticas} />
                <PrivateRoute exact path="/usuarios" roles={[1]} component={Usuarios} />
                <PrivateRoute exact path="/sectores" roles={[1]} component={Sectores} />
                <Route path="/404" component={SettingServer} />
                <Redirect to="/info" />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default MainMenu;