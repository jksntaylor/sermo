import React, {Component} from 'react';
import User from './user/user';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Posts from './posts/posts';

class Home extends Component {
    // componentDidMount() {
    //     if (!this.props.isLoggedIn) {
    //         this.props.history.push('/')
    //     }
    // }
    render() {
        return (
            <div className='home-component-container'>
                {/* MATCH OBJECT COMPETENCIES */}
                <button>{this.props.match.params.number}</button>
                <User />
                <Posts />
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