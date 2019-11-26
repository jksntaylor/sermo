import React, {Component} from 'react';
import Logout from './logout';
import {connect} from 'react-redux';

class User extends Component {
    constructor() {
        super();
        this.state = {
            
        }
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