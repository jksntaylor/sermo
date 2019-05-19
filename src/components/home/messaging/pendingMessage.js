import React, { Component } from 'react';

export default class PendingMessage extends Component {
    accept = () => {

    }

    reject = () => {
        
    }
    render() {
        return (
            <div>
                <h1>{this.props.message.user1}</h1>
                
                <button>Accept</button>
                <button>Reject</button>
            </div>
        )
    }
}