import React, {Component} from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

class NewPost extends Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            title: '',
            text: ''
        }
    }

    openModal = () => {
        this.setState({modalIsOpen: true});
      }
    
    closeModal = () => {
        this.setState({modalIsOpen: false});
    }

    post = () => {

    }

    handleTitleChange = e => {
        this.setState({
            title: e.target.value
        })
    }

    handleTextChange = e => {
        this.setState({
            text: e.target.value
        })
    }
    
    render() {
        return (
            <div>
                <button onClick={this.openModal}>New Post</button>
                <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                >
        
                <button onClick={this.closeModal}>x</button>
                <input placeholder='Title' onChange={this.handleTitleChange}/>
                <input placeholder='Text' onChange={this.handleTextChange}/>
                <button>Post</button>
                </Modal>
            </div>
        );
    }
} 

export default NewPost;