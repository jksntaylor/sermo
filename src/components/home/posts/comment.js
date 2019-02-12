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
        axios.post(`/api/editComment/${this.state.comment.id}`).then(() => {
            this.props.handleNewComment();
        })
    }

    deleteComment = () => {
        axios.post(`/api/deleteComment/${this.state.comment.id}`).then(() => {
            this.props.handleNewComment();
        })
    }
    render() {
        const {author, date, text} = this.state.comment;
        if (this.state.canEdit) {
            if (this.state.isEditing) {
               var editor = <div>
                                <button onClick={this.closeEditor}>Cancel</button>
                                <input value={this.state.text} onChange={this.handleCommentChange}/>
                                <button onClick={this.submitEdit}>Save Changes</button>
                            </div>
            } else {
                editor = <div>
                            <button onClick={this.openEditor}>Edit</button>
                            <button onClick={this.deleteComment}>Delete</button>
                         </div>
            }   
        } else {
            editor = null;
        }

        return (
            <div>
                <h1>{author}</h1>
                <h2>{date}</h2>
                <p>{text}</p>
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