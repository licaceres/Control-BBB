import React, { Component } from 'react';
import { Card } from 'antd';
import { DatabaseOutlined } from '@ant-design/icons';


class Servidor extends Component {
  
  render() {
    return (
      <div>
        <Card bordered={false} title={<span style={{fontSize: '1.2em'}}>Servidor</span>} extra={<DatabaseOutlined />}>
        
        </Card>
      </div>
    )
  }
}

export default Servidor;

