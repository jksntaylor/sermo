import React, {Component} from 'react';
import NewPost from './newpost';

class Posts extends Component {
    render() {
        return (
            <div>
                <h1>Posts</h1>
                <NewPost />
            </div>
        )
    }
}

export default Posts;