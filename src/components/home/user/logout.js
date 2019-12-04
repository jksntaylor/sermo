import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loggedOut} from '../../../redux/reducer';
import axios from 'axios';

class Logout extends Component {
        
    logout = () => {
        axios.post('/api/logout').then(() => {
            this.props.loggedOut();
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.logout}><h2>Logout</h2><i className='ion-md-exit'/></button>
            </div>
        )
    }
}

export default connect(null, {loggedOut})(Logout);