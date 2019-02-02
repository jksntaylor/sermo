import React, {Component} from 'react';
import Login from './login';
import Register from './register';

export default class Auth extends Component {
    render() {
        return (
            <div>
                <h1>Auth</h1>
                <Login />
                <Register />
            </div>
        )
    }
}