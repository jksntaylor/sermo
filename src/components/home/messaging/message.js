import React, { Component } from 'react';
import axios from 'axios'

export default class Message extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            info: {},
            messages: []
        }
    }

    componentDidMount() {
        this.getMessages();
        const {socket} = this.props;
        socket.on('dm', () => {
            this.getMessages();
        })
    }

    getMessages = () => {
        axios.get(`/api/getOpenMessage/${this.props.room}`).then(res => {
            console.log(res)
            this.setState({info: res.data[0][0], messages: res.data[1]})
        });
    }

    handleKeyPress = e => {
        if (e.key === 'Enter') {
                this.sendMessage()
        } 
    }

    sendMessage = () => {
        if (!this.state.input) {
            return;
        }
        const {socket} = this.props;
        const data = {
            author: this.props.user.username,
            content: this.state.input,
            timestamp: new Date().getTime(),
            id: this.state.info.id
        }
        axios.post(`/api/sendMessage`, data).then(res => {
            this.setState({messages: res.data, input: ''})
        })
        socket.emit('direct message', this.state.info.room, data)
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
                let style;
                if (message.author === this.props.user.username) {style = 'mine'} else {style='theirs'}
                return (
                    <li className={style} key={message.timems}>{message.content}</li>
                )
            })
        }
        return (
            <div className='message-container'>
                <div class="header">
                    <button onClick={() => {this.props.handleExpansion(this.props.room)}}><i className='fas fa-2x fa-arrow-left'></i></button>
                    <h1 className='message-user'>{this.props.user.username === this.state.info.user1 ? this.state.info.user2 : this.state.info.user1}</h1>
                </div>
                <ul className='messages'>{messages}</ul>
                <div className="message-input">
                    <input value={this.state.input} onKeyUp={this.handleKeyPress} onChange={e => this.setState({input: e.target.value})} placeholder='Type Here'/>
                    <i className="fas fa-paper-plane" onClick={this.sendMessage}></i>
                </div>
            </div>
        )
    }
}