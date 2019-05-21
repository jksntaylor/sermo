import React, {Component} from 'react';
import axios from 'axios';

export default class NewComment extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            modalIsOpen: false
        }
    }

    openModal = () => {
        this.setState({modalIsOpen: true});
      }
    
    closeModal = () => {
        this.setState({modalIsOpen: false});
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
        if (this.state.modalIsOpen) {
            var commentInput =  <div>
                                    <textarea placeholder='type here' value={this.state.text} onChange={this.handleTextChange}/>
                                    <button onClick={this.comment}>Comment</button>
                                    <button onClick={this.closeModal}>Cancel</button>
                                </div>
        } else {
            commentInput =  <div>
                                <button onClick={this.openModal}>New Comment</button>
                            </div>
        }
        return (
            <div className='newcomment-container'>
                {commentInput}
            </div>
        )
    }
}