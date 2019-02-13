import React, {Component} from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            title: '',
            text: '',
            mediaFile: "",
            link: '',
            postType: 'text',
            postButtons: false
        }
    }

    handlePostButton = () => {
        this.setState({postButtons: !this.state.postButtons})
    }

    openModalText = () => {
        this.setState({modalIsOpen: true, postType: 'text', postButtons: false});
    }
    
    openModalMedia = () => {
        this.setState({modalIsOpen: true, postType: 'media', postButtons: false});
    }

    openModalLink = () => {
        this.setState({modalIsOpen: true, postType: 'link', postButtons: false})
    }
    
    closeModal = () => {
        this.setState({modalIsOpen: false});
    }
    
    handleTitleChange = e => {
        this.setState({
            title: e.target.value
        })
    }
 
    handleTextChange = e => {
        this.setState({
            text: e.target.value
        })
    }

    handleMediaChange = e => {
        this.setState({
            mediaFile: e.target.files[0]
        }, () => {
        const fileToBase64 = (file) => {
            return new Promise(resolve => {
              var reader = new FileReader();
              reader.onload = function(event) {
                resolve(event.target.result);
              };
              reader.readAsDataURL(file);
            });
          };
          fileToBase64(this.state.mediaFile).then(v => {
              this.setState({mediaFile: v.slice(v.indexOf(',')+1)})
          });
        })
    }

    handleLinkChange = e => {
        this.setState({link: e.target.value})
    }

    post = () => {
        const {title, text, mediaFile, postType, link} = this.state
        if (postType==='text') {
            axios.post('/api/newTextPost', {title, text}).then(res => {
                this.props.updatePosts(res.data);
                this.closeModal();
            })
        } else if (postType==='link') {
            axios.post('/api/newMediaPost', {title, link}).then(res => {
                this.props.updatePosts(res.data);
                this.closeModal();
            })
        } else {
            var headers = {
                'Authorization': `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`
            }
            axios.post('https://api.imgur.com/3/image', {"image": mediaFile}, {'headers': headers}).then(res => {
                const {link} = res.data.data;
                console.log(link)
                axios.post('/api/newMediaPost', {title, link}).then(res => {
                    this.props.updatePosts(res.data);
                    this.closeModal();
                })
            }).catch(err => {
                console.log(err)
            })
        }
    }
    
    render() {
        if (this.state.postButtons) {
            var postButton = <button onClick={this.handlePostButton}>x</button>
        } else {
            postButton = <button onClick={this.handlePostButton}>+</button>
        }

        if (this.state.postButtons) {
            var style = {display: 'inline'}
        } else {
            style = {display: 'none'}
        }

        if (this.state.postType==='text') {
            var input = <input placeholder='Text' onChange={this.handleTextChange}/>
        } else if (this.state.postType==='link') {
            input = <input value={this.state.link} placeholder='image url' onChange={this.handleLinkChange}/>
        } else {
            input = <input type='file' onChange={this.handleMediaChange}/>
        }
        return (
            <div>
                {postButton}
                <div style={style}>
                    <button onClick={this.openModalText}>Text</button>
                    <button onClick={this.openModalMedia}>Upload Media</button>
                    <button onClick={this.openModalLink}>Media Link</button>
                </div>
                <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                >
        
                <button onClick={this.closeModal}>x</button>
                <input placeholder='Title' onChange={this.handleTitleChange}/>
                {input}
                <button onClick={this.post}>Post</button>
                </Modal>
            </div>
        );
    }
} 

export default NewPost;