import React, {Component} from 'react';

export default class Register extends Component {
    render() {
        return (
            <div>
                <h2>Register</h2>
                <input placeholder='username'/>
                <input placeholder='email'/>
                <input placeholder='password'/>
                <input placeholder='confirm password'/>
                <input type='checkbox'/><span>Remember Me</span>
                <button>Register</button>
            </div>
        )
    }
}