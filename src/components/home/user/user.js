import React, {Component} from 'react';
import Logout from './logout';
import axios from 'axios';

export default class User extends Component {
    constructor() {
        super();
        this.state = {
            input: ''
        }
    }

    handleChange = e => {
        this.setState({
            input: e.target.value
        })
    }

    // search = () => {
    //     axios.get(`/api/searchusers?user=${this.state.input}`).then(res => {
    //         alert(res.data.username + '  ' + res.data.email);
    //     })
    // }
    render() {
        return (
            <div className='user-component-container'>
                <Logout />
                {/* <input value={this.state.input} onChange={this.handleChange} placeholder='search users'/>
                <button onClick={this.search}>Search</button> */}
            </div>
        )
    }
}