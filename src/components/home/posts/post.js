import React, {Component} from 'react';
import {connect} from 'react-redux'
import NewComment from './newcomment';
import axios from 'axios';
import Comments from './comments';
import Voting from './voting';
import { Modal } from 'shards-react';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal:false,
            modal2: false,
            post: this.props.post,
            comments: [],
            commentCount: 0,
            uservote: 'none'
        }
    }

    toggle = () => {
        this.setState({modal: !this.state.modal})
    }

    toggle2 = () => {
        this.setState({modal2: !this.state.modal2})
    }

    handleNewComment = () => {
        axios.get(`/api/${this.state.post.id}/comments`).then(res => {
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

    deletePost = () => {
        axios.post(`/api/deletePost/${this.state.post.id}`).then(() => {
            this.toggle();
            this.props.reload();
        })
    }

    calculateTime = () => {
        const timeMS = new Date(this.state.post.time).getTime();
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
        var linkDots, dots, teaser, content;

        let postInfo =  <div className='post-info'>
                            {this.props.isLoggedIn ? <Voting upvoters={upvoters} downvoters={downvoters} postID={this.state.post.id} uservote={this.state.uservote} handleUservoteChange={this.handleUservoteChange}/> : null}
                            <h6>{author}</h6>
                            <h6>{elapsedTime}</h6>
                            <h6>{this.state.commentCount} comments</h6>
                        </div>

        dots = posttype==='text'&&text.length>200 ? '...' : null;
        linkDots = posttype==='link'&&text.length>40 ? '...' : null;

        teaser = posttype==='text' ?
        <div className='text'>
            <h2>{title}</h2>
            <p>{text.slice(0,200)}{dots}</p>
        </div>
        : posttype==='link' ?
        <div className='link'>
            <div className='link-info'>
                <h2>{title}</h2>
                <a href={text} target='_blank' rel='noopener noreferrer'>{text.slice(0,40)}{linkDots}</a>
            </div>
            <a href={text} target='_blank' rel='noopener noreferrer'><img alt={title} src={media}/></a>
        </div>
        :
        <div className='media'>
            <h2>{title}</h2>
            <img alt={title} src={media}/>
        </div>

        content = posttype==='text' ?
        <p>{text}</p> : posttype==='link' ?
        <div className='content-link'>
            <a href={text} target='_blank' rel='noopener noreferrer'>{text}</a>
            <a href={text} target='_blank' rel='noopener noreferrer'><img alt={title} src={media}/></a>
        </div>
        : <img alt={title} src={media}/>

        return (
            <div className='post-container'>
                <div className='teaser-container' onClick={this.toggle}>
                    {teaser}
                    {postInfo}
                </div>
                <Modal open={this.state.modal} toggle={this.toggle}>
                    <Modal open={this.state.modal2} toggle={this.toggle2} size='sm'>
                        <h1>Are you sure?</h1>
                        <div className='delete-buttons'>
                            <button onClick={this.deletePost}>Yes, Delete It</button>
                            <button onClick={this.toggle2}>Never Mind</button>
                        </div>
                    </Modal>
                        <div className='post-header'>
                            <h2>{title}</h2>
                            {+this.props.post.user_id === +this.props.user.id ? <button onClick={this.toggle2}><i className='ion-ios-trash'/></button> : null}
                        </div>
                        <div className='post-content'>
                            {content}
                        </div>
                        <div className='infovoting'>
                            {postInfo}
                        </div>
                        <NewComment parentIsPost={true} parentID={this.props.postID} postID={this.props.postID} handleNewComment={this.handleNewComment}/>
                        <Comments comments={this.state.comments} handleNewComment={this.handleNewComment}/>
                </Modal>
            </div>
        )
    }
}

let mapStateToProps = state => {
    return {
        user: state.user,
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps)(Post);
