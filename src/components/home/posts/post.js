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
            // console.log(res);
            this.setState({comments: res.data, commentCount: res.data.length});
        })
    }

    handleUservoteChange = val => {
        console.log(val)
        this.setState({
            uservote: val
        })
    }

    componentDidMount = () => {
        if (this.state.post.downvoters.length > 5) {
            this.deletePost();
        }
        this.handleNewComment();
        if (this.state.post.upvoters.includes(+this.props.user.id)) {
            this.setState({uservote: 'up'})
        } else if (this.state.post.downvoters.includes(+this.props.user.id)) {
            this.setState({uservote: 'down'})
        }
    }

    deletePost = () => {
        axios.post(`/api/deletePost/${this.state.post.id}`).then(() => {
            this.closeModal();
        })
    }

    calculateTime = () => {
        const {time} = this.state.post
        const timeMS = new Date(time).getTime();
        const current = new Date().getTime();
        const elapsed = current - timeMS;
        if (elapsed<60000) {
            let num = Math.floor(elapsed/1000).toString();
            return num + 's';
        } else if (elapsed<3600000) {
            let num = Math.floor(elapsed/60000).toString();
            return num + 'm';
        } else if (elapsed<86400000) {
            let num = Math.floor(elapsed/3600000).toString();
            return num + 'hr'
        } else if (elapsed<2592000000) {
            let num = Math.floor(elapsed/86400000).toString();
            return num + 'd'
        } else if (elapsed<31536000000) {
            let num = Math.floor(elapsed/2592000000).toString();
            return num + 'mo'
        } else {
            let num = Math.floor(elapsed/31536000000).toString();
            return num + 'y'
        }
    }

    render() {
        const {author, title, text, posttype, media, upvoters, downvoters} = this.state.post
        var elapsedTime = this.calculateTime();
        if (posttype==='text'&&text.length>100) {
            var teaserdots = '...'
        } else {
            teaserdots = null
        }
        if (posttype==='text') {
            var teasercontent = <p>{text.slice(0,100)}{teaserdots}</p>
            var content = <p>{text}</p>
        } else {
            teasercontent = <img alt='' src={media}/>
            content = <img alt='' src={media}/>
        }
        return (
            <div className='post-container'>
                <Voting upvoters={upvoters} downvoters={downvoters} postID={this.state.post.id} uservote={this.state.uservote} handleUservoteChange={this.handleUservoteChange}/>
                <div className='post-teaser-container' onClick={this.openModal}>
                    <h2>{title}</h2>
                    {teasercontent}
                    <div className='post-info'>
                        <h1>{author}</h1>
                        <h6>{elapsedTime}</h6>
                        <h5>{this.state.commentCount} comments</h5>
                    </div>
                </div>
                <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                >
                    <div class="post-modal">
                        <button className='close-modal' onClick={this.closeModal}>x</button>
                        <h2>{title}</h2>
                        {content}
                        <div class="post-modal-info">
                            <h1>{author}</h1>
                            <h6>{elapsedTime}</h6>
                            {+this.props.post.user_id === +this.props.user.id ? 
                            <button onClick={this.deletePost}><i className='fas fa-trash'/></button>
                            : null}
                        </div>
                        <Voting upvoters={upvoters} downvoters={downvoters} postID={this.state.post.id} uservote={this.state.uservote} handleUservoteChange={this.handleUservoteChange}/>
                        <NewComment parentIsPost={true} parentID={this.props.postID} postID={this.props.postID} handleNewComment={this.handleNewComment}/>
                        <Comments comments={this.state.comments} handleNewComment={this.handleNewComment}/>
                    </div>
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