import React, {Component} from 'react';
import axios from 'axios';

export default class NewComment extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
        }
    }

    handleTextChange = e => {
        this.setState({text: e.target.value})
    }
    
    comment = () => {
        const {text} = this.state;
        const {parentID, postID} = this.props;
        console.log(text, parentID, postID);
        axios.post('/api/newComment', {text, parentID, postID}).then(() => {
            this.props.handleNewComment();
            this.setState({text: '', modalIsOpen: false})
        })
    }
    
    
    render() {
        return (
            <div className='newcomment-container'>
                <textarea placeholder='New Comment' value={this.state.text} onChange={this.handleTextChange}/>
                <button onClick={this.comment}>Post</button>
            </div>
        )
    }
}