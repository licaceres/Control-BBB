import React, { Component } from 'react';
import { Table, Button, Popconfirm, message, Card, Tooltip, Empty } from 'antd';
import { TeamOutlined, ReloadOutlined, CloseCircleOutlined, ZoomInOutlined, UserOutlined } from '@ant-design/icons';


class Usuarios extends Component {
  
  render() {
    return (
      <div>
        <Card bordered={false} title={<span style={{fontSize: '1.2em'}}>Usuarios</span>} extra={<TeamOutlined />}>
          <Button
            type='primary'
            icon={<ReloadOutlined />}
            style={{ marginBottom: '10px' }}
            onClick={this.handleRequest}>
            Actualizar
          </Button>
        </Card>
      </div>
    );  
  }
}

export default Usuarios;