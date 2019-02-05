import React, {Component} from 'react';
import Modal from 'react-modal';

class NewPost extends Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false
        }
    }

    openModal = () => {
        this.setState({modalIsOpen: true});
      }
    
    closeModal = () => {
        this.setState({modalIsOpen: false});
    }
    
    render() {
        return (
            <div>
                <button onClick={this.openModal}>Open Modal</button>
                <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                >
        
                <button onClick={this.closeModal}>x</button>
                <input placeholder='Title' />
                <input placeholder='Text' />
                <button>Post</button>
                </Modal>
            </div>
        );
    }
} 

export default NewPost;