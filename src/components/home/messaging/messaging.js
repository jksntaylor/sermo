import React, { Component } from 'react'
import io from 'socket.io-client';
const socket = io();

export default class Messaging extends Component {
    constructor() {
        super();
        this.state = {
            message: '',
            messages: []
        }
    }

    componentDidMount() {
       socket.on('chat message', message => {
            const arr = this.state.messages.slice();
            arr.push(message);
            this.setState({messages: arr})
        }) 
    }

    handleInputChange = val => {
        this.setState({message: val})
    }

    sendMessage = () => {
        if (!this.state.message) {return};
        socket.emit('chat message', this.state.message);
        this.setState({message: ''})
    }

    render() {
        
        const messages = this.state.messages.map(message => {
            return (
                <li>{message}</li>
            )
        })
        return (
            <div>
                <h1>Messaging</h1>
                <input value={this.state.message} onChange={e => {this.handleInputChange(e.target.value)}}/>
                <button onClick={this.sendMessage}>send</button>
                <ul>{messages}</ul>
            </div>
        )
    }
}