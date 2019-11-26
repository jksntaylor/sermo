import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class Voting extends Component {
    handleUpvote = () => {
        let {upvoters, downvoters, uservote, handleUservoteChange} = this.props;
        if (uservote==='up') {
            upvoters.splice(upvoters.indexOf(+this.props.user.id), 1)
            handleUservoteChange('none');
            axios.post(`/api/${this.props.postID}/voting`, {upvoters, downvoters})
        } else if (uservote==='none') {
            upvoters.push(+this.props.user.id)
            handleUservoteChange('up');
            axios.post(`/api/${this.props.postID}/voting`, {upvoters, downvoters})
        } else {
            downvoters.splice(downvoters.indexOf(+this.props.user.id), 1)
            upvoters.push(+this.props.user.id);
            handleUservoteChange('up');
            axios.post(`/api/${this.props.postID}/voting`, {upvoters, downvoters})
        }
    }

    handleDownvote = () => {
        let {upvoters, downvoters, uservote, handleUservoteChange} = this.props;
        if (uservote==='down') {
            downvoters.splice(downvoters.indexOf(+this.props.user.id), 1)
            handleUservoteChange('none');
            axios.post(`/api/${this.props.postID}/voting`, {upvoters, downvoters})
        } else if (uservote==='none') {
            downvoters.push(+this.props.user.id)
            handleUservoteChange('down');
            axios.post(`/api/${this.props.postID}/voting`, {upvoters, downvoters})
        } else {
            upvoters.splice(upvoters.indexOf(+this.props.user.id), 1)
            downvoters.push(+this.props.user.id);
            handleUservoteChange('down');
            axios.post(`/api/${this.props.postID}/voting`, {upvoters, downvoters})
        }
    }

    render() {
        if (this.props.uservote==='up') {
            var upStyle = {color: 'orange'}
            var downStyle = {color: 'gray'}
        } else if (this.props.uservote==='down') {
            upStyle = {color: 'gray'}
            downStyle = {color: 'orange'}
        } else {
            upStyle = {color: 'gray'}
            downStyle = {color: 'gray'}
        }
        const votingScore = this.props.upvoters.length - this.props.downvoters.length
        return (
            <div className='voting-container'>
                <div>
                    <button onClick={this.handleUpvote}><i style={upStyle} className="fas fa-2x fa-arrow-up"/></button>
                    <button onClick={this.handleDownvote}><i style={downStyle} className="fas fa-2x fa-arrow-down"/></button>
                </div>
                <h1>{votingScore}</h1>
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