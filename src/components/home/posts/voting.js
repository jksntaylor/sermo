import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class Voting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uservote: 'none'
        }
    }

    componentDidMount() {
        if (this.props.upvoters.includes(+this.props.user.id)) {
            this.setState({uservote: 'up'})
        } else if (this.props.downvoters.includes(+this.props.user.id)) {
            this.setState({uservote: 'down'})
        }
        console.log(this.props.upvoters, this.props.downvoters)
    }

    handleUpvote = () => {
        let {upvoters, downvoters} = this.props;
        let {uservote} = this.state;
        if (uservote==='up') {
            upvoters.splice(upvoters.indexOf(+this.props.user.id), 1)
            this.setState({uservote: 'none'}, () => {
                console.log(upvoters, downvoters, this.state.uservote)
                axios.post(`/api/${this.props.postID}/voting`, {upvoters, downvoters})
            })
        } else if (uservote==='none') {
            upvoters.push(+this.props.user.id)
            this.setState({uservote: 'up'}, () => {
                console.log(upvoters, downvoters, this.state.uservote)
                axios.post(`/api/${this.props.postID}/voting`, {upvoters, downvoters})
            })
        } else {
            downvoters.splice(downvoters.indexOf(+this.props.user.id), 1)
            upvoters.push(+this.props.user.id);
            this.setState({uservote: 'up'},  () => {
                console.log(upvoters, downvoters, this.state.uservote)
                axios.post(`/api/${this.props.postID}/voting`, {upvoters, downvoters})
            })
        }
    }

    handleDownvote = () => {
        let {upvoters, downvoters} = this.props;
        let {uservote} = this.state;
        if (uservote==='down') {
            downvoters.splice(downvoters.indexOf(+this.props.user.id), 1)
            this.setState({uservote: 'none'}, () => {
                console.log(upvoters, downvoters, this.state.uservote)
                axios.post(`/api/${this.props.postID}/voting`, {upvoters, downvoters})
            })
        } else if (uservote==='none') {
            downvoters.push(+this.props.user.id)
            this.setState({uservote: 'down'}, () => {
                console.log(upvoters, downvoters, this.state.uservote)
                axios.post(`/api/${this.props.postID}/voting`, {upvoters, downvoters})
            })
        } else {
            upvoters.splice(upvoters.indexOf(+this.props.user.id), 1)
            downvoters.push(+this.props.user.id);
            this.setState({uservote: 'down'},  () => {
                console.log(upvoters, downvoters, this.state.uservote)
                axios.post(`/api/${this.props.postID}/voting`, {upvoters, downvoters})
            })
        }
    }

    render() {
        const votingScore = this.props.upvoters.length - this.props.downvoters.length
        return (
            <div>
                <button onClick={this.handleUpvote}><i className="fas fa-arrow-up"/></button>
                <h1>{votingScore}</h1>
                <button onClick={this.handleDownvote}><i className="fas fa-arrow-down"/></button>
            </div>
        )
    }
}

let mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Voting);