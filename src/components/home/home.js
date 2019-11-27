import React, {Component} from 'react';
import {connect} from 'react-redux';
import Posts from './posts/posts';
import Messaging from './messaging/messaging';
import User from './user/user';
import io from 'socket.io-client';
import Auth from '../auth/auth';
import Filter from './filter';
import Search from './search';
import { Container, Row, Col } from 'shards-react';
import Header from './header';
const socket = io();


class Home extends Component {
    componentDidMount() {
        const onlineUser = {username: this.props.user.username,
                            socket: socket.id}
        if (onlineUser.username) {socket.emit('username', onlineUser)}
    }
    render() {
        return (
            <Container className='home-container'>
                <Header/>
                <Posts/>
                {this.props.isLoggedIn ? <User/> : <Auth/>}
                {this.props.isLoggedIn ? <Messaging {...this.props} socket={socket}/> : null}
            </Container>
        )
    }   
}

let mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn,
        user: state.user
    }
}

export default connect(mapStateToProps)(Home);