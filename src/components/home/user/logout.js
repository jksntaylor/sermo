import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {loggedOut} from '../../../redux/reducer';

class Logout extends Component {
        
    logout = () => {
        this.props.loggedOut();
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}

export default withRouter(connect(null, {loggedOut})(Logout))