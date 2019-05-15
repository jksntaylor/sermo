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
            searchResults: []
        }
    }


    getAllMessages = () => {
        axios.get('/api/getAllMessages').then(res => {
            this.setState({messages: res.data})
        })
    }

    handleInputChange = val => {
        this.setState({userSearch: val})
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
                     </div>)
        })
        let results;
        if (this.state.searchResults) {
            results = this.state.searchResults.map(result => {
                return (
                    <div key={result.id}>{result.username}</div>
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
                <input placeholder='username' onChange={e => {this.handleInputChange(e.target.value)}}/>
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