import React, { Component } from 'react';
import { Card } from 'antd';
import { DatabaseOutlined } from '@ant-design/icons';


class Servidor extends Component {
  
  render() {
    return (
      <div>
        <Card bordered={false} title={<span style={{fontSize: '1.2em'}}>Servidor</span>} extra={<DatabaseOutlined />}>

          <img src="http://cactibbb.duckdns.org/cacti/graph_image.php?action=view&local_graph_id=5&rra_id=1" alt="graph"/>
          

        </Card>
      </div>
    )
  }
}

export default Servidor;

