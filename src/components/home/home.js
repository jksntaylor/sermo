import React, {Component} from 'react';
import User from './user/user';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class Home extends Component {
    componentDidMount() {
        if (!this.props.isLoggedIn) {
            this.props.history.push('/')
        }
    }
    render() {
        return (
            <div>
                <h1>Home</h1>
                <User />
            </div>
        )
    }
}

let mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}

export default withRouter(connect(mapStateToProps)(Home));