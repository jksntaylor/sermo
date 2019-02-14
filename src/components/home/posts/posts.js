import React, {Component} from 'react';
import NewPost from './newpost';
import Post from './post';
import axios from 'axios';

class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            filter: 'new',
            time: 'day',
            limit: 25,
            page: 1
        }
    }

    componentDidMount = () => {
        axios.get('/api/initialLoadPosts').then(res => {
            this.setState({
                posts: res.data
            })
        });
        // this.handleSortPosts();
    }

    handleSortPosts = () => {
        const {filter, time, limit, page} = this.state;
        axios.get(`/api/${filter}/${time}/${limit}/${page}`).then(res => {
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
            return <Post post={post} key={post.id} postID={post.id}/>
        })
        } else {
        posts = <h1>No posts available</h1>
        } 
        return (
            <div className='posts-component-container'>
                <div className='posts-container'>{posts}</div>
                <NewPost posts={this.state.posts} updatePosts={this.updatePosts}/>
            </div>
        )
    }
}

export default Posts;