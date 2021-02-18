import React, { Component } from 'react';
import { Modal } from 'antd';


class ModalPlayback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exists: false,
      loading: false,
      sala: '',
      loadingUsuarios: true,
    };
  }

  render() {
    const { visibleModal, loading, recording } = this.props;
    const { exists } = this.state;
  
    if (exists) {
      return (
        <Modal
          title={'Playback'}
          visible={visibleModal}
          okText='Cerrar'
          onOk={this.okModal}
          okButtonProps={{
            disabled: loading,
            loading: loading  
          }}
          onCancel={this.okModal}
          cancelButtonProps={{
            style: { display: 'none' }
          }}
          width='95%'>
          <div>
            <iframe src={recording.playback.format.url} width="500" height="500" title="Rec"></iframe>
          </div>
        </Modal>
      );
    } else {
      return null;
    }
  }

  componentDidUpdate = async () => {
    if (this.props.visibleModal && !this.state.exists) {
      this.setState({
        exists: true
      });
    }
  }
  okModal =() => {
    this.props.handleModal();
    this.setState({exists: false, recording: null});
  }
}

export default ModalPlayback;