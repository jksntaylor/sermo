import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import Message from './message';
import PendingMessage from './pendingMessage';


class Messaging extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            userSearch: '',
            messages: [],
            pendingMessages: [],
            searchResults: [],
            expandedRequest: '',
            requestText: ''
        }
    }

    componentDidMount() {
        if (this.props.user) {
            this.getAllMessages();
        }
    }


    getAllMessages = () => {
        axios.get('/api/getAllMessages').then(res => {
            this.setState({messages: res.data})
        });
        axios.get('/api/getPendingMessages').then(res => {
            this.setState({pendingMessages: res.data})
        });
    }

    handleChange = (key, val) => {
        this.setState({[key]: val})
    }

    openModal = () => {
        this.setState({modalIsOpen: true});
    }

    closeModal = () => {
        this.setState({modalIsOpen: false});
    }

    searchMessagingUsers = () => {
        axios.get(`/api/messaging/searchUsers/${this.state.userSearch}`).then(res => {
            this.setState({userSearch: '', searchResults: res.data})
        })
    }

    openMessageRequest = val => {
        this.setState({expandedRequest: val, requestText: ''})
    }

    sendMessageRequest = () => {
        const {socket} = this.props;
        const data = {
            recipient: this.state.expandedRequest,
            sender: this.props.user.username,
            message: {
                timestamp: new Date().getTime(),
                content: this.state.requestText
            }
        }
        socket.emit('message request', data.recipient, data.message)
        axios.post('/api/newMessageRequest', data).then(res => {
            if (res.status) {
            this.closeModal();
            this.getAllMessages();
            }
        })
    }

    render() {
        const messages = this.state.messages.map(message => {
            return (<Message key={message.room} message={message} user={this.props.user}/>)
        })
        const pending = this.state.pendingMessages.map(message => {
            return (<PendingMessage key={message.room} message={message} user={this.props.user} refresh={this.getAllMessages}/>)
        })
        let results;
        if (this.state.searchResults) {
            results = this.state.searchResults.map(result => {
                return (
                    <div key={result.id}>
                        <h1>{result.username}</h1>
                        <button onClick={() => {this.openMessageRequest(result.username)}}>Request</button>
                        {this.state.expandedRequest === result.username ? 
                            <div>
                                <textarea onChange={e => {this.handleChange('requestText', e.target.value)}}/>
                                <button onClick={this.sendMessageRequest}>Send</button>
                            </div> : null}
                    </div>
                )
            })
        } else {results = null}
        return (
            <div>
                <h1>Messaging</h1>
                <div className='pending-messages'>
                    {pending}
                </div>
                <div className='messages'>
                    {messages}
                </div>
                <button onClick={this.openModal}>New Chat</button>
                <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                >
                <input placeholder='username' onChange={e => {this.handleChange('userSearch', e.target.value)}}/>
                <button onClick={this.searchMessagingUsers}>Search</button>
                {results}
                </Modal>
            </div>
        )
    }
}


let mapStateToProps = state => {
    return {
        user: state.user,
        isLoggedIn: state.isLoggedIn
    }
}

export default withRouter(connect(mapStateToProps)(Messaging));