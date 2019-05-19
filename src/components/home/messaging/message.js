import React, { Component } from 'react';

export default class Message extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            messages: []
        }
    }

    componentDidUpdate(props) {
        if (this.props.message && props !== this.props) {
            let arr = this.state.messages.slice();
            Object.keys(this.props.message.messages).forEach(obj => {
                arr.push(this.props.message.messages[obj])
            })
            this.setState({messages: arr})
        }
    }
    render() {
        const messages = this.state.messages.map(message => {
            return (
                <li>{message.content}</li>
            )
        })
        return (
            <div>   
            {this.props.room === '' ? 
            <h1>Click on a Message to Open it!</h1> 
            :
            <div>
                <h1>{this.props.room}</h1>
                <ul>{messages}</ul>
                <input value={this.state.input} onChange={e => this.setState({input: e.target.value})}/>
            </div>
            }
            </div>
        )
    }
}