import React, { Component } from 'react';
// import axios from 'axios';

export default class MessageTeaser extends Component {

    render() {
        const {message} = this.props
        return (
            <div className='message-teaser'>
                {message.user1 === this.props.user.username ? message.user2 : message.user1}
            </div>
        )
    }
}