import React, {Component} from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

class NewPost extends Component {
    constructor(props) {
        super(props);
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

    post = () => {
        const {title, text} = this.state
        axios.post('/api/newpost', {title, text}).then(res => {
             this.props.updatePosts(res.data);
             this.closeModal();
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
                <button onClick={this.post}>Post</button>
                </Modal>
            </div>
        );
    }
} 

export default NewPost;