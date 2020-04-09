import React, { Component } from 'react';
import { Card } from 'antd';
import { DatabaseOutlined } from '@ant-design/icons';


class Servidor extends Component {
  
  render() {
    return (
      <div>
        <Card title="Servidor" extra={<DatabaseOutlined />}>
        </Card>
      </div>
    )
  }
}

export default Servidor;

