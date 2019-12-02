import React, {Component} from 'react';
import Posts from './posts/posts';
import Messaging from './messaging/messaging';
import User from './user/user';
import Auth from '../auth/auth';
import Header from './header';
import Trending from './trending';
import { Container, Row, Col } from 'shards-react';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';
const socket = io();


class Home extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }
    componentDidMount() {
        const onlineUser = {username: this.props.user.username,
                            socket: socket.id}
        if (onlineUser.username) {socket.emit('username', onlineUser)};
        this.reload();
    }

    updatePosts = posts => {
        this.setState({posts: posts})
    }

    reload = () => {
        axios.get('/api/initialLoadPosts').then(res => {
            this.setState({posts: res.data})
        });
    }

    render() {
        return (
            <Container className='home-container'>
                <Row><Header updatePosts={this.updatePosts} reload={this.reload}/></Row>
                <Row>
                    <Col className='col trending' xs='12' sm='12' md='0' lg='3'><Trending/></Col>
                    <Col className='col posts' xs='12' sm='12' md='8' lg='6'><Posts updatePosts={this.updatePosts} posts={this.state.posts} reload={this.reload}/></Col>
                    <Col className='col user' xs='12' sm='12' md='4' lg='3'>
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
        user: state.user,
        posts: state.posts
    }
}

export default connect(mapStateToProps)(Home);