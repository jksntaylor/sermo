import React, {Component} from 'react';
import {connect} from 'react-redux'
import Modal from 'react-modal';
import NewComment from './newcomment';
import axios from 'axios';
import Comments from './comments';
import Voting from './voting';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen:false,
            post: this.props.post,
            comments: [],
            commentCount: 0,
            uservote: 'none'
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

    handleUservoteChange = val => {
        this.setState({
            uservote: val
        })
    }

    componentDidMount = () => {
        this.handleNewComment();
        if (this.state.post.upvoters.includes(+this.props.user.id)) {
            this.setState({uservote: 'up'})
        } else if (this.state.post.downvoters.includes(+this.props.user.id)) {
            this.setState({uservote: 'down'})
        }
    }

    render() {
        const {author, time, title, text, posttype, media, upvoters, downvoters} = this.state.post
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
                <Voting upvoters={upvoters} downvoters={downvoters} postID={this.state.post.id} uservote={this.state.uservote} handleUservoteChange={this.handleUservoteChange}/>
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
                    <Voting upvoters={upvoters} downvoters={downvoters} postID={this.state.post.id} uservote={this.state.uservote} handleUservoteChange={this.handleUservoteChange}/>
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

let mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Post);