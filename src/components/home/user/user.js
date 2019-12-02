import React, {Component} from 'react';
import Logout from './logout';
import {connect} from 'react-redux';
import axios from 'axios';

class User extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }

    getUserPost = () => {
        axios.get(`/api/getUserPosts/${this.props.user.id}`)
    }

    render() {
        return (
            <div className='user-component-container'>
                <h1>{this.props.user.username}</h1>
                <Logout />
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