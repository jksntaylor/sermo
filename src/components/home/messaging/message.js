import React, { Component } from 'react';
import axios from 'axios';

export default class Message extends Component {
//     constructor() {
//         super();
//     }

    render() {
        const {message} = this.props
        return (
            <div style={{border: '1px solid red'}}>{message.user1 === this.props.user.username ? message.user2 : message.user1}</div>
        )
    }
}