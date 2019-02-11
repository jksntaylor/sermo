import React, {Component} from 'react';
import Modal from 'react-modal';
import NewComment from './newcomment';
import axios from 'axios';

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen:false,
            post: this.props.post,
            comments: []
        }
    }
    openModal = () => {
        this.setState({modalIsOpen: true});
      }
    
    closeModal = () => {
        this.setState({modalIsOpen: false});
    }
    
    handleNewComment = () => {
        axios.get(`/api/${this.state.post.id}/comments`).then(res => {
            console.log(res);
            this.setState({comments: res.data})
        })
    }
    render() {
        const {author, time, title, text} = this.state.post
        if (text.length>100) {
            var teaserdots = '...'
        } else {
            teaserdots = null
        }
        return (
            <div style={{border: '1px solid red', margin: '2px'}}>
                <div onClick={this.openModal}>
                    <h1>{author}</h1>
                    <h2>{title}</h2>
                    <p>{text.slice(0,100)}{teaserdots}</p>
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
                    <NewComment parentIsPost={true} parentID={this.props.postID} handleNewComment={this.handleNewComment}/>
                </Modal>
            </div>
        )
    }
}