import React, { Component } from 'react';
import { Card } from 'antd';
import { DatabaseOutlined } from '@ant-design/icons';
import axios from 'axios';

class Servidor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
    };
  }
  render() {
    
    return (
      
      <div>
        <Card bordered={false} title={<span style={{fontSize: '1.2em'}}>Servidor</span>} extra={<DatabaseOutlined />}>          
        </Card>
      </div>
    )
  }
  
  handleRequest = async () => {
    var resultado = await axios.get('https://localhost:44398/api/salas');
    console.log(resultado);
  }

  componentDidMount() {
    this.handleRequest();
  }
}

export default Servidor;

