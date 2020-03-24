import React, { Component } from 'react';
import { Row, Col, Table, Button, Form, Divider, message } from 'antd';
import { FormItem } from '../globalComponents';


class Main extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      
    };
  }
  
  render() {
    return(
      <div>
        <h1>Control BigBlueButton</h1>
         <div>
         <Row>
          <Col xs={{ span: 10 }} lg={{ span: 12 }}>
         <Form
              onSubmit={this.handleSubmit}
              className='login-form'>
              <FormItem 
                key='url'
                label='URL Server: '
                name='url'
                placeholder='Ingrese'
                value={this.url}
                error={null}
                onChange={this.onChange}/>

              <FormItem 
                key='clave'
                name='Clave Secreta: '
                label='clave'
                placeholder='Ingrese'
                value={this.clave}
                error={null}
                onChange={this.onChange}/>

              <div className='clientes-buttons'>
                <Button 
                  type='primary' 
                  htmlType='submit'>
                  Guardar
                </Button>
                
              </div>
            </Form>
            </Col>
            </Row>
         </div>
      </div>
    );
  }
}

export default Main;