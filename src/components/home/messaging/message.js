import React, { Component } from 'react';
import axios from 'axios'

export default class Message extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            messages: {}
        }
    }

    componentDidMount() {
        axios.get(`/api/getOpenMessage/${this.props.room}`).then(res => {
            console.log(res)
            this.setState({messages: res.data[0].messages})
        })
    }

    sendMessage = () => {
        const data = {
            author: this.props.user.username,
            content: this.state.input,
            timestamp: new Date().getTime()
        }
        axios.post(`/api/sendMessage/${this.props.room}`, data).then(res => {
            this.setState({messages: res.data[0].messages, input: ''})
        })
    }

    render() {
        let messages;
        if (!this.state.messages) {
            messages = <h2>No Messages Yet. Say Hi!</h2>
        } else {
            let arr = [];
            for (var obj in this.state.messages) {
                arr.push({
                    timems: obj,
                    content: this.state.messages[obj].content,
                    author: this.state.messages[obj].author
                })
            }
            // sort array by time here
            messages = arr.map(message => {
                return (
                    <li key={message.timems}>{message.content}</li>
                )
            })
        }
        return (
            <div>
                <ul>{messages}</ul>
                <div className="message-input">
                    <input value={this.state.input} onChange={e => this.setState({input: e.target.value})} placeholder='Type Here'/>
                    <i className="fas fa-paper-plane" onClick={this.sendMessage}></i>
                </div>
            </div>
        )
    }
}