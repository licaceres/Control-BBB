import React, { Component } from 'react';
import { Card } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';





class Ayuda extends Component {
  constructor(props) {
    super(props);
    this.state={html: null};
  }

  render() {
    if(!this.state.html){
      return (<div>

        </div>)
    };
    var htm={__html:this.state.html};
    return (
      <div>
        <Card bordered={false} title={<span style={{fontSize: '1.2em'}}>Ayuda</span>} extra={<QuestionCircleOutlined />}>
          <div dangerouslySetInnerHTML={htm} ></div>
        </Card>
      </div>
    );
  }
  componentDidMount() {
    var me=this;
    fetch('monsadoc/monsa_doc.html')
    .then(function(response) {
        return response.text();
    }).then(function(data) {
      me.setState({html:data});
    }).catch(function(ex) {
        me.setState({html:(<h3>{ex}</h3>)});
    });
    console.log(this.state.html);
}

    
}

export default Ayuda;

