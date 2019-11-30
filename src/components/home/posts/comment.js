import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';


class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            comment: this.props.comment,
            owns: false
        }
    }

    componentDidMount() {
        if (+this.props.user.id===+this.state.comment.user_id) {
            this.setState({owns: true})
        };
        this.setState({text: this.state.comment.text})
    }

    deleteComment = () => {
        axios.post(`/api/deleteComment/${this.state.comment.comment_id}`).then(() => {
            this.props.handleNewComment();
        })
    }

    calculateTime = () => {
        const {date} = this.state.comment
        const timeMS = new Date(date).getTime();
        const current = new Date().getTime();
        const elapsed = current - timeMS;
        if (elapsed<60000) {
            let num = Math.floor(elapsed/1000).toString();
            return num + 's';
        } else if (elapsed<3600000) {
            let num = Math.floor(elapsed/60000).toString();
            return num + 'm';
        } else if (elapsed<86400000) {
            let num = Math.floor(elapsed/3600000).toString();
            return num + 'hr'
        } else if (elapsed<2592000000) {
            let num = Math.floor(elapsed/86400000).toString();
            return num + 'd'
        } else if (elapsed<31536000000) {
            let num = Math.floor(elapsed/2592000000).toString();
            return num + 'mo'
        } else {
            let num = Math.floor(elapsed/31536000000).toString();
            return num + 'y'
        }
    }

    render() {
        const {author, text} = this.state.comment;
        const elapsedTime = this.calculateTime();
        let trash = this.state.owns ? <button onClick={this.deleteComment}><i className='ion-ios-trash'/></button> : null

        return (
            <div className='comment'>
                <p>{text}</p>
                <div class="comment-info">
                    <h6>{author}</h6>
                    <h6>{elapsedTime}</h6>
                    {trash}
                </div>
            </div>
        )
    }
}


let mapStateToProps = state => {
    return {
        user: state.user
    }
} 

export default connect(mapStateToProps)(Comment);