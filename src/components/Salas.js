import React, { Component } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import { Col, Row, Card, Table, Divider, Button, Popconfirm, message } from 'antd';
import * as tools from '../globalComponents/api_calls/index';

class Salas extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      version: '',
      salas: '',
      activas: '',
      usuarios: '',
      loadingversion: true,
      loadingsalas: true,
      loadingusuarios: true,

    };
  }

  render() {
    const { salas, loadingsalas } = this.state;
    const columns = [{
        title: 'Nombre de sala',
        dataIndex: 'meetingName',
        key: 'meetingName',
        
      }, {
        title: 'Fecha y hora',
        dataIndex: 'createTime',
        key: 'createTime',
      }, {
        title: 'attendeePW',
        dataIndex: 'attendeePW',
        key: 'attendeePW',
      }, {
        title: 'moderatorPW',
        dataIndex: 'moderatorPW',
        key: 'moderatorPW',
    },{
        title: 'Activa',
        dataIndex: 'running',
        key: 'running',
        render: data => {
            if (data === true) return 'Si'
            if (data === false) return 'No'            
            return data;
        }
    },{
        title: 'Acciones',
        key: 'acciones',
        render: item => {
            console.log(item);
          return (
            <div>
              <Button
                onClick={() => this.handleConsultar(item)}>
                Consultar
              </Button> 
              <Popconfirm 
                onConfirm={() => this.handleEliminar(item)}
                title="Seguro desea eliminar el usuario?" okText="Confirmar" cancelText="Cancelar">
                <Button>
                  Eliminar
                </Button>
              </Popconfirm>
            </div>
          );
        }
      }
    ];
    return (
      <div>
        <Button
          type='primary'
          //icon='plus-circle'
          onClick={this.handleRequest}>
          Actualizar
        </Button>

        <Divider />
   
          <Col xs={{ span: 24 }} lg={{ span: 24, offset: 1 }}>
            <Table
              columns={columns}
              pagination={{ pageSize: 5 }}
              dataSource={salas}
              loading={loadingsalas}
              scroll={{ x: true }}
              rowKey='createTime'
              bordered
              locale={{ emptyText: "No hay salas" }} />
          </Col>
      </div>
    );
  }
  handleRequest = async () => {
    var resultado;
    await axios.get(tools.getMeetings())
    .then((response) => {
        parseString(response.data, function (err, result) {
            console.log(err);
            resultado = result.response.meetings[0].meeting;
        });
        }
    );
    
    this.setState({salas: resultado, loadingsalas: false});
    console.log(resultado);
    }

    handleEliminar = async (sala) => {
        var resultado;
        console.log(sala);
        await axios.get(tools.endMeeting(sala))
            .then((response) => {
                parseString(response.data, function (err, result) {
                    console.log(err);
                    resultado = result.response;
                    console.log(resultado);
                    if(resultado.returncode[0] === 'SUCCESS'){
                        message.success('Sala cerrada con éxito');
                    }else{
                        message.error(resultado.messageKey[0]);
                    }
                });
            }
            );
    }

    handleConsultar = async (sala) => {
        
    }

    componentDidMount(){
        this.handleRequest();
      }
}

export default Salas;