import React, {Component} from 'react';
import NewPost from './newpost';
import Post from './post';
import axios from 'axios';

class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }

    componentDidMount = () => {
        axios.get('/api/initialLoadPosts').then(res => {
            console.log('success');
            this.setState({
                posts: res.data
            })
        })
    }

    updatePosts = arr => {
        this.setState({posts: arr});
    }
    
    render() {
        if (this.state.posts) {
        var posts = this.state.posts.map(post => {
            return <Post post={post} key={post.id}/>
        })
        } else {
        posts = <h1>No posts available</h1>
        } 
        return (
            <div>
                <h1>Posts</h1>
                <div>{posts}</div>
                <NewPost posts={this.state.posts} updatePosts={this.updatePosts}/>
            </div>
        )
    }
}

export default Posts;