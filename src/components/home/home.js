import React, {Component} from 'react';
import User from './user/user';
import {connect} from 'react-redux';
import {HashRouter, Route, Switch, Link, withRouter} from 'react-router-dom';
import Posts from './posts/posts';
import Messaging from './messaging/messaging';

class Home extends Component {
    // componentDidMount() {
    //     if (!this.props.isLoggedIn) {
    //         this.props.history.push('/')
    //     }
    // }
    render() {
        return (
            <HashRouter>
                <div className='home-component-container'>
                    <User/>
                        <Link to='/home'>Posts</Link>
                        <Link to='/home/messaging'>Messages</Link>
                        <Switch>
                            <Route exact path='/home' component={Posts}/>
                            <Route path='/home/messaging' component={Messaging}/>
                        </Switch>
                </div>
            </HashRouter>
        )
    }   
}

let mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}

export default withRouter(connect(mapStateToProps)(Home));