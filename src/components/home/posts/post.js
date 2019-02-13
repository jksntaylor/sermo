import React, {Component} from 'react';
import Modal from 'react-modal';
import NewComment from './newcomment';
import axios from 'axios';
import Comments from './comments';

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen:false,
            post: this.props.post,
            comments: [],
            commentCount: 0
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
            this.setState({comments: res.data, commentCount: res.data.length});
        })
    }

    componentDidMount = () => {
        this.handleNewComment();
    }

    render() {
        const {author, time, title, text, posttype, media} = this.state.post
        if (posttype==='text'&&text.length>100) {
            var teaserdots = '...'
        } else {
            teaserdots = null
        }
        if (posttype==='text') {
            var teasercontent = <p>{text.slice(0,100)}{teaserdots}</p>
            var content = <p>{text}</p>
        } else {
            teasercontent = <img height='100' alt='' src={media}/>
            content = <img alt='' src={media}/>
        }
        return (
            <div style={{border: '1px solid red', margin: '2px'}}>
                <div onClick={this.openModal}>
                    <h2>{title}</h2>
                    {teasercontent}
                    <h1>{author}</h1>
                    <h6>{time}</h6>
                    <h5>{this.state.commentCount} comments</h5>
                </div>
                <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                >
                    <h1>{author}</h1>
                    <h6>{time}</h6>
                    <h2>{title}</h2>
                    {content}
                    <NewComment parentIsPost={true} parentID={this.props.postID} postID={this.props.postID} handleNewComment={this.handleNewComment}/>
                    <Comments comments={this.state.comments} handleNewComment={this.handleNewComment}/>
                </Modal>
            </div>
        )
    }
}