import React, { Component } from 'react';
import axios from 'axios';

export default class PendingMessage extends Component {
    accept = () => {
        const data = {
            room: this.props.room
        }
        axios.post('/api/acceptMessage', data).then(this.props.refresh())
    }

    reject = () => {
        const data = {
            room: this.props.room
        }
        axios.post('/api/rejectMessage', data).then(this.props.refresh())
    }

    render() {
        let content;
        for (var message in this.props.message.messages) {
            content = this.props.message.messages[message]['content']
        }
        return (
            <div style={{border: '1px solid white'}}>
                {
                this.props.user.username === this.props.message.user2 ?
                <div>
                    <h1>{this.props.message.user1}</h1>
                    <p>{content}</p>
                    <div className='buttons'>
                    <button onClick={this.accept}>Accept</button>
                    <button onClick={this.reject}>Reject</button>
                    </div>
                </div>
                :
                <div>
                    <h1>{this.props.message.user2}</h1>
                    <p>{content}</p>
                    <h2>Waiting on Response</h2>
                </div>
             }
            </div>
        )
    }
}   