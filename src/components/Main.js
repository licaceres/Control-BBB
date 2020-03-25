import React, { Component } from 'react';
import { Row, Col, Table, Button, Form, Divider, message } from 'antd';
import { FormItem } from '../globalComponents';


class Main extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      url: '',
      clave: ''
    };
  }
  
  render() {
    const { url, clave } = this.state;
    return(
      <div>
        <h1>Control BigBlueButton</h1>
         <div>
         <Row>
          <Col xs={{ span: 10 }} lg={{ span: 12 }}>
            <Form
              //onSubmit={this.handleSubmit}
              className='login-form'>
              <FormItem 
                key='url'
                label='URL Server: '
                name='url'
                placeholder='Ingrese'
                value={url}
                error={null}
                onChange={this.onChange} />

                <FormItem 
                  key='clave'
                  label='Clave: '
                  name='clave'
                  placeholder='Ingrese'
                  value={clave}
                  error={null}
                  onChange={this.onChange}/>

              <div className='clientes-buttons'>
              <Button 
                  type='primary' 
                  icon='search'
                  onClick={this.handleSubmit}>
                  Buscar
                </Button>
                
              </div>
            </Form>
            </Col>
            </Row>
         </div>
      </div>
    );
  }
  onChange = (value, key) => {
    this.setState({ [key]: value });
    console.log(value);
  }
  
  handleSubmit = (event) => {  
    const { url, clave } = this.state;
    console.log(url);
    if (!!event) event.preventDefault();

    if (!url && !clave) {
      return message.warning('Complete formulario para realizar la busqueda');
    }
    console.log(url);
    this.props.handleSubmit(url, clave);
    
  }
}



export default Main;