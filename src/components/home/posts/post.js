import React, {Component} from 'react';
import Modal from 'react-modal';

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen:false,
            post: this.props.post
        }
    }
    openModal = () => {
        this.setState({modalIsOpen: true});
      }
    
    closeModal = () => {
        this.setState({modalIsOpen: false});
    }
    
    render() {
        const {author, time, title, text} = this.state.post
        return (
            <div>
                <div onClick={this.openModal}>
                    <h1>{author}</h1>
                    <h2>{title}</h2>
                    <p>{text.slice(0,50)}. . .</p>
                    <h6>{time}</h6>
                </div>
                <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                >
                    <h1>{author}</h1>
                    <h6>{time}</h6>
                    <h2>{title}</h2>
                    <p>{text}</p>
                </Modal>
            </div>
        )
    }
}