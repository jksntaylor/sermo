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
        const {parentID, parentIsPost} = this.props;
        console.log(text, parentID, parentIsPost);
        axios.post('/api/newComment', {text, parentID, parentIsPost}).then(() => {
            this.props.handleNewComment();
        })
    }
    
    
    render() {
        if (this.state.modalIsOpen) {
            var commentInput =  <div>
                                    <button onClick={this.closeModal}>Cancel</button>
                                    <input placeholder='type here' value={this.state.text} onChange={this.handleTextChange}/>
                                    <button onClick={this.comment}>Comment</button>
                                </div>
        } else {
            commentInput =  <div>
                                <button onClick={this.openModal}>Comment</button>
                            </div>
        }
        return (
            <div>
                {commentInput}
            </div>
        )
    }
}