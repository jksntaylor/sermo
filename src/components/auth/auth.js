import React, {Component} from 'react';
import Login from './login';
import Register from './register';
import axios from 'axios';
import {connect} from 'react-redux';
import {loggedIn} from '../../redux/reducer';
import {withRouter} from 'react-router-dom';


class Auth extends Component {

    componentDidMount() {
        axios.get('/api/checkAuth').then(res => {
            if (res.data) {
                console.log(res.data)
                this.props.loggedIn(res.data)
                this.props.history.push('/home');
            } else {
                console.log(res.data);
            }
        })
    }

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

export default withRouter(connect(null, {loggedIn})(Auth));