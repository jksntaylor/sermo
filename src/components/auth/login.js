import React, {Component} from 'react';

export default class Login extends Component {
    render() {
        return (
            <div>
                <h2>Login</h2>
                <input placeholder='username'/>
                <input placeholder='password'/>
                <input type='checkbox'/><span>Remember Me</span>
                <button>Login</button>
            </div>
        )
    }
}