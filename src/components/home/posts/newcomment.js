import React, {Component} from 'react';
import Modal from 'react-modal';

export default class NewComment extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            modalIsOpen: false
        }
    }

    openModal = () => {
        this.setState({modalIsOpen: true});
      }
    
    closeModal = () => {
        this.setState({modalIsOpen: false});
    }

    handleTextChange = e => {
        this.setState({text: e.target.value})
    }
    
    
    render() {
        return (
            <div>
            <button onClick={this.openModal}>Comment</button>
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                >
                <input placeholder='type here' value={this.state.text} onChange={this.handleTextChange}/>   
            </Modal>
            </div>
        )
    }
}