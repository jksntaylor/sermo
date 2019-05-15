import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';


class Messaging extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            userSearch: '',
            messages: [],
            searchResults: [],
            expandedRequest: '',
            requestText: ''
        }
    }


    getAllMessages = () => {
        axios.get('/api/getAllMessages').then(res => {
            this.setState({messages: res.data})
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

    messageRequest = val => {
        this.setState({expandedRequest: val, requestText: ''})
    }

    render() {
        const messages = this.state.messages.map(message => {
            let userID;
            if (this.props.user.id === message.user1_id) {
                userID = message.user2_id
            } else {
                userID = message.user1_id
            }
            return ( <div>
                       <h1>{userID}</h1> 
                     </div>
                    )
        })
        let results;
        if (this.state.searchResults) {
            results = this.state.searchResults.map(result => {
                return (
                    <div key={result.id}>
                        <h1>{result.username}</h1>
                        <button onClick={() => {this.messageRequest(result.username)}}>Request</button>
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