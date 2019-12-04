import React, {Component} from 'react';
import Logout from './logout';
import {connect} from 'react-redux';
import Post from '../posts/post';
import axios from 'axios';

class User extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        this.getUserPost();
    }

    getUserPost = () => {
        axios.get(`/api/getUserPosts/${this.props.user.id}`).then(res => {
            this.setState({posts: res.data})
        })
    }

    render() {
        let posts =  this.state.posts.map(post => {
            return  <Post post={post}/>
        })
        return (
            <div className='user-component-container'>
                <div className='user-header'>
                    <h1>{this.props.user.username}</h1>
                    <Logout />
                </div>
                <div className='user-posts'>
                    <h1>My Recent Posts</h1>
                    {posts}
                </div>
            </div>
        )
    }
}

let mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(User);