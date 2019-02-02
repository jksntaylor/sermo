import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {loggedIn} from '../../redux/reducer'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {withRouter} from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    handleUsernameChange = e => {
        this.setState({username: e.target.value})
    }

    handlePasswordChange = e => {
        this.setState({password: e.target.value})
    }

    handleCheckboxChange = () => {
        this.setState({remember: !this.state.remember})
    }

    loginFailed = () => toast('Invalid Credentials', {
        position: toast.POSITION.TOP_CENTER
    });

    login = () => {
        const {username, password} = this.state;
        axios.post('/api/login', {username, password}).then(response => {
            this.setState({
                username: '',
                password: '',
                remember: false
            })
            this.props.loggedIn(response.data);
            this.props.history.push('/home'); 
        }).catch( err => {
            console.log(err);
            this.loginFailed();
        })
    }

    render() {
        return (
            <div>
                <ToastContainer/>
                <h2>Login</h2>
                <input placeholder='username' value={this.state.username} onChange={this.handleUsernameChange}/>
                <input placeholder='password' value={this.state.password} onChange={this.handlePasswordChange} type='password'/>
                <input type='checkbox' onChange={this.handleCheckboxChange}/><span>Remember Me</span>
                <button onClick={this.login}>Login</button>
            </div>
        )
    }
}

export default withRouter(connect(null, {loggedIn})(Login));