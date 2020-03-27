import React, { Component } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import { Col, Row, Card } from 'antd';



class Estadistica extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      version: '',
      salas: '',
      loading: true,

    };
  }

  render() {
    return(
      <div>
        <Row justify="center">
          <Col span={24}>
            <Card title="Estadísticas">
              <Col span={8}>
                <Card type="inner" loading={this.state.loading}>
                  BBB Version: {this.state.version}
                </Card>
              </Col>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  handleRequest = async () => {
    var resultado;
    await axios.get(localStorage.getItem('url'))
    .then((response) => {
        parseString(response.data, function (err, result) {
            console.log(err);
            resultado = result.response;
        });
      });
    this.setState({version: resultado.version, loading: false});
  }
  componentDidMount(){
    this.handleRequest();
  }
}



export default Estadistica;

