import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import Message from './message';


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
        this.getAllMessages();
        this.getPendingMessages();
    }


    getAllMessages = () => {
        axios.get('/api/getAllMessages').then(res => {
            this.setState({messages: res.data})
        })
    }

    getPendingMessages = () => {
        axios.get('/api/pendingMessages').then(res => {
            this.setState({pendingMessages: res.data})
        })
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
            username: this.state.expandedRequest,
            message: {
                author: this.props.user.id,
                timestamp: new Date(),
                content: this.state.requestText
            }
        }
        socket.emit('message request', data.username, data.message)
        axios.post('/api/newMessageRequest', data).then(() => {
            this.closeModal();
            this.getAllMessages();
        })
    }

    render() {
        const messages = this.state.messages.map(message => {
            return (<Message key={message.room} message={message} user={this.props.user}/>)
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
                                <button>Send</button>
                            </div> : null}
                    </div>
                )
            })
        } else {results = null}
        return (
            <div>
                <h1>Messaging</h1>
                {messages}
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