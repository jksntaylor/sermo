import React, { Component } from 'react';
import axios from 'axios';

export default class Message extends Component {
//     constructor() {
//         super();
//     }

    newMessageResponse = bool => {
        const data = {
            bool: bool,
            user1: this.props.message.user1
        }
        axios.post('/api/newMessageReponse', data).then(() => {console.log('responded successfully')})
    }

    render() {
        const {message} = this.props
        return (
            <div>{message.user1 ? message.user1 : message.user2}</div>
        )
    }
}