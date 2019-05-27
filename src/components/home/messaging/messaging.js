import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import MessageTeaser from './messageTeaser';
import PendingMessage from './pendingMessage';
import Message from './message';


class Messaging extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            userSearch: '',
            messageTeasers: [],
            pendingMessages: [],
            expandedMessage: '',
            searchResults: [],
            expandedRequest: '',
            requestText: ''
        }
    }

    componentDidMount() {
        let refresh = this.refresh
        if (this.props.user) {
            this.refresh();
        }
        const {socket} = this.props;
        socket.on('request', function() {
            refresh();
        })
    }

    refresh = () => {
        this.getMessageTeasers();
        this.getPendingMessages();
    }

    joinRooms = () => {
        const {socket} = this.props
        this.state.messageTeasers.forEach(message => {
            socket.emit('join room', message.room)
        })
    }


    getMessageTeasers = () => {
        axios.get('/api/getMessageTeasers').then(res => {
            this.setState({messageTeasers: res.data}, () => {
                this.joinRooms();
            })
        });
    }

    getPendingMessages = () => {
        axios.get('/api/getPendingMessages').then(res => {
            this.setState({pendingMessages: res.data})
        });
    }

    handleChange = (key, val) => {
        this.setState({[key]: val})
    }

    handleExpansion = val => {
        if (this.state.expandedMessage !== val) {
            this.setState({expandedMessage: val})
        } else {
            this.setState({expandedMessage: ''})
        }
    }

    handleKeyPress = e => {
        if (e.key === 'Enter') {
                this.searchMessagingUsers()
        } 
    }

    handleKeyPress2 = e => {
        if (e.key === 'Enter') {
                this.sendMessageRequest()
        } 
    }

    openModal = () => {
        this.setState({modalIsOpen: true});
    }

    closeModal = () => {
        this.setState({modalIsOpen: false, searchResults: [], userSearch: ''});
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
        socket.emit('send message request', data.recipient, data.message)
        axios.post('/api/newMessageRequest', data).then(res => {
            if (res) {
            this.closeModal();
            this.getPendingMessages();
            }
        })
    }

    render() {
        const messageTeasers = this.state.messageTeasers.map(teaser => {
            return (<li onClick={() => {this.handleExpansion(teaser.room)}} key={teaser.id} >
                <MessageTeaser user={this.props.user} message={teaser}/>
                    </li>)
        })
        const pending = this.state.pendingMessages.map(message => {
            return (<li onClick={() => {this.handleExpansion(message.room)}}>
                <PendingMessage key={message.room} message={message} user={this.props.user} refresh={this.refresh}/>
            </li>)
        })
        let results;
        if (this.state.searchResults) {
            results = this.state.searchResults.map(result => {
                return (
                    <div key={result.id} className={`search-result ${this.state.expandedRequest === result.username ? 'active' : null}`}>
                        <h1>{result.username}</h1>   
                        {this.state.expandedRequest === result.username ? 
                            <div>
                                <input className='request-input' onKeyUp={this.handleKeyPress2} onChange={e => {this.handleChange('requestText', e.target.value)}} placeholder='Send a note!'/>
                                <button onClick={this.sendMessageRequest}>Send</button>
                                <button onClick={() => {this.setState({expandedRequest: ''})}}>Cancel</button>
                            </div>
                            :
                            <button onClick={() => {this.openMessageRequest(result.username)}}>Request</button>}
                    </div>
                )
            })
        } else {results = null}
        return (
            <div className='messaging-component-container'>
                {!this.state.expandedMessage ? 
                <div className='messaging-dashboard'>
                    <ul className='pending-messages-list'>
                    {pending}
                    </ul>
                    <h1>Click on a Message to Open it!</h1>
                    <ul className='messages-list'>
                    {messageTeasers}
                    </ul>
                    <button onClick={this.openModal}>New Chat</button>
                    <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    >
                    <div class="user-search">
                        <div class="search-input">
                            <input onKeyUp={this.handleKeyPress} placeholder='username' onChange={e => {this.handleChange('userSearch', e.target.value)}}/>
                            <button onClick={this.searchMessagingUsers}><i className="fas fa-search"></i></button>
                        </div>
                        {results}
                        </div>
                    </Modal>
                </div>
                :
                <Message room={this.state.expandedMessage} user={this.props.user} handleExpansion={this.handleExpansion} socket={this.props.socket}/>
                }
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