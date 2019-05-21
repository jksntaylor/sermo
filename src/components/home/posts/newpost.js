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
            postButtons: false,
            tooBig: false,
            anon: false,
            error: '',
            loading: false
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
        this.setState({modalIsOpen: false,
                       title: '',
                       text: '',
                       mediaFile: "",
                       link: '',
                       postType: 'text',
                       postButtons: false,
                       tooBig: false,
                       anon: false,
                       error: '',
                       loading: false});
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
    
    handleLinkChange = e => {
        this.setState({link: e.target.value})
    }

    handleMediaChange = e => {
        if (e.target.files[0].size>4999999) {
            this.setState({tooBig: true});
            return null;
        }

        this.setState({
            mediaFile: e.target.files[0],
            tooBig: false
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

    handleAnonChange = () => {
        this.setState({anon: !this.state.anon})
    }
   
    post = () => {
        if (!this.state.title) {
            this.setState({error: 'title'});
            return;
        }
        console.log('posting')
        const {title, text, mediaFile, postType, link, anon} = this.state
        if (postType==='text') {
            if (!this.state.text) {
                this.setState({error: 'text'});
                return;
            }
            this.setState({loading: true})
            axios.post('/api/newTextPost', {title, text, anon}).then(res => {
                this.props.updatePosts(res.data);
                this.closeModal();
            })
        } else if (postType==='link') {
            if (!this.state.link) {
                this.setState({error: 'link'});
                return;
            }
            this.setState({loading: true})
            axios.post('/api/newMediaPost', {title, link, anon}).then(res => {
                this.props.updatePosts(res.data);
                this.closeModal();
            })
        } else {
            if (!this.state.mediaFile) {
                this.setState({error: 'media'});
                return;
            }
            this.setState({loading: true})
            var headers = {
                'Authorization': `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`
            }
            axios.post('https://api.imgur.com/3/image', {"image": mediaFile}, {'headers': headers}).then(res => {
                const {link, in_gallery} = res.data.data;
                console.log(link, in_gallery)
                axios.post('/api/newMediaPost', {title, link, anon}).then(res => {
                    this.props.updatePosts(res.data);
                    this.closeModal();
                })
            }).catch(err => {
                console.log(err)
            })
        }
    }
    
    render() {

        if (this.state.tooBig) {
            var tooBig = 'Please choose a smaller file (less than 5MB)';
        } else if (this.state.loading) {
            tooBig = <div className='loading-animation'></div>
        } else {
            tooBig = <button onClick={this.post}>Post</button>;
            
        }

        if (this.state.postButtons) {
            var postButton = <button onClick={this.handlePostButton} className='close-menu'>+</button>
        } else {
            postButton = <button onClick={this.handlePostButton} className='open-menu'>+</button>
        }

        if (this.state.postButtons) {
            var style = 'active'
        } else {
            style = 'initial'
        }

        if (this.state.postType==='text') {
            var input = <textarea className={this.state.error==='text' ? 'error' : null} placeholder='Text' onChange={this.handleTextChange}/>
        } else if (this.state.postType==='link') {
            input = <input className={`link-input ${this.state.error==='link' ? 'error' : null}`} value={this.state.link} placeholder='image url' onChange={this.handleLinkChange}/>
        } else {
            input = <input className={`file-input ${this.state.error==='media' ? 'error' : null}`} type='file' accept="image/*, video/*" onChange={this.handleMediaChange}/>
        }
        return (
            <div className='newpost'>
                {postButton}
                    <button className={`post-type ${style}-text`}onClick={this.openModalText}><i className="fas fa-align-justify"></i></button>
                    <button className={`post-type ${style}-upload`}onClick={this.openModalMedia}><i className="fas fa-upload"></i></button>
                    <button className={`post-type ${style}-link`}onClick={this.openModalLink}><i className="fas fa-link"></i></button>
                <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                >
        
                <div class="newpost-content">
                    <button onClick={this.closeModal} className='cancel-post'>x</button>
                    <input className={this.state.error==='title' ? 'error' : null} placeholder='Title' onChange={this.handleTitleChange}/>
                    {input}
                    <div>
                        <input className='checkbox' type='checkbox' onChange={this.handleAnonChange}/><span>Post Anonymously</span>
                    </div>
                    {tooBig}
                </div>
                </Modal>
            </div>
        );
    }
} 

export default NewPost;