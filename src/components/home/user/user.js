import React, {Component} from 'react';
import Logout from './logout';

export default class User extends Component {
    render() {
        return (
            <div>
                <h1>User</h1>
                <Logout />
            </div>
        )
    }
}