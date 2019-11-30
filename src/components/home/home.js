import React, {Component} from 'react';
import {connect} from 'react-redux';
import Posts from './posts/posts';
import Messaging from './messaging/messaging';
import User from './user/user';
import io from 'socket.io-client';
import Auth from '../auth/auth';
import { Container, Row, Col } from 'shards-react';
import Header from './header';
import Trending from './trending';
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
                <Row><Header/></Row>
                <Row>
                    <Col className='col trending' xs='12' sm='12' md='0' lg='3'><Trending/></Col>
                    <Col className='col posts' xs='12' sm='12' md='8' lg='6'><Posts/></Col>
                    <Col className='col right' xs='12' sm='12' md='4' lg='3'>
                        {this.props.isLoggedIn ? <User/> : <Auth/>}
                        {this.props.isLoggedIn ? <Messaging {...this.props} socket={socket}/> : null}
                    </Col>
                </Row>
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