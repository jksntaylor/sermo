import React, {Component} from 'react';
import NewPost from './newpost';
import Post from './post';

class Posts extends Component {
    constructor() {
        super();
        this.state = {
            filter: 'new',
            time: 'day',
            limit: 25,
            page: 1
        }
    }

    // handleSortPosts = () => {
    //     const {filter, time, limit, page} = this.state;
    //     axios.get(`/api/${filter}/${time}/${limit}/${page}`).then(res => {
    //         this.setState({
    //             posts: res.data
    //         })
    //     })
    // }

    updatePosts = posts => {
        this.props.updatePosts(posts);
    }
    
    render() {
        if (this.props.posts) {
        var posts = this.props.posts.map(post => {
            return <Post post={post} key={post.id} postID={post.id} reload={this.props.reload}/>
        })
        } else {
        posts = <h1>No posts available</h1>
        } 
        return (
            <div className='posts-component-container'>
                <NewPost posts={this.props.posts} updatePosts={this.props.updatePosts}/>
                <div className='posts-container'>{posts}</div>
            </div>
        )
    }
}

export default Posts;