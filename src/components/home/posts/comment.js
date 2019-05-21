import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';


class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            comment: this.props.comment,
            canEdit: false,
            isEditing: false
        }
    }

    componentDidMount() {
        if (+this.props.user.id===+this.state.comment.user_id) {
            this.setState({canEdit: true})
        };
        this.setState({text: this.state.comment.text})
    }

    handleCommentChange = e => {
        this.setState({text: e.target.value})
    }

    openEditor = () => {
        this.setState({isEditing: true})
    }

    closeEditor = () => {
        this.setState({isEditing: false, text:this.state.comment.text})
    }

    submitEdit = () => {
        let text = this.state.text;
        text += ' (edited)'
        axios.post(`/api/editComment/${this.state.comment.comment_id}`, {text}).then(() => {
            this.props.handleNewComment();
            this.closeEditor();
        })
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
        if (this.state.canEdit) {
            if (this.state.isEditing) {
               var editor = <div className='comment-editor'>
                                <textarea value={this.state.text} onChange={this.handleCommentChange}/>
                                <button onClick={this.closeEditor}>x</button>
                                <button onClick={this.submitEdit}><i className='fas fa-check'/></button>
                            </div>
            } else {
                editor = <div className='comment-editor'>
                            <button onClick={this.openEditor}><i className='fas fa-edit'/></button>
                            <button onClick={this.deleteComment}><i className='fas fa-trash'/></button>
                         </div>
            }   
        } else {
            editor = null;
        }

        return (
            <div className='comment'>
                <p>{text}</p>
                <div class="comment-info">
                    <h1>{author}</h1>
                    <h2>{elapsedTime}</h2>
                </div>
                {editor}
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