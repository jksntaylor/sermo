import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {loggedIn} from '../../redux/reducer'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            remember: false
        }
    }

    handleEmailChange = e => {
        this.setState({
            email: e.target.value
        })
    }

    handleUsernameChange = e => {
        this.setState({
            username: e.target.value
        })
    }

    handlePasswordChange = e => {
        this.setState({
            password: e.target.value
        })
    }

    handleConfirmChange = e => {
        this.setState({
            confirmPassword: e.target.value
        })
    }

    handleRememberChange = () => {
        this.setState({remember: !this.state.remember})
    }

    passwordsDontMatch = () => toast("Passwords don't match", {
        position: toast.POSITION.TOP_CENTER
    });

    emailTaken = () => toast('Username Already Taken', {
        position: toast.POSITION.TOP_CENTER
    });

    register = () => {
        const {username, email, password, confirmPassword} = this.state;
        if (password!==confirmPassword) {
            return this.passwordsDontMatch()  
        }
        axios.post('/api/register', {username, email, password}).then(response => {
            this.setState({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
           this.props.loggedIn(response.data);
           this.props.history.push('/home');
        }).catch(() => this.emailTaken())
    }

    render() {
        return (
            <div className='register'>
                <ToastContainer/>
                <h2>Register</h2>
                <input placeholder='email' onChange={this.handleEmailChange}/>
                <input placeholder='username' onChange={this.handleUsernameChange}/>
                <input type='password' placeholder='password' onChange={this.handlePasswordChange}/>
                <input type='password' placeholder='confirm password' onChange={this.handleConfirmChange}/>
                <div className='remember'>
                    <input type='checkbox' onChange={this.handleRememberChange}/>
                    <span>Remember Me</span>
                </div>
                <button onClick={this.register}><i className='ion-ios-arrow-round-forward'></i></button>
            </div>
        )
    }
}

export default connect(null, {loggedIn})(Register);