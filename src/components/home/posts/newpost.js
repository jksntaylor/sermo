import React, {Component} from 'react';
import { Modal } from 'shards-react';
import axios from 'axios';

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            title: "",
            content: "",
            type: "text",
            error: ""
        }
    }

    toggle = type => {
        this.setState({ modal: !this.state.modal,
                        title: "",
                        content: "",
                        type: type,
                        error: ""})
    }

    handleChange = (key, value) => {
        this.setState({[key]: value})
    }

    checkMedia = e => {
        let file = e.target.files[0];
        if (file.size>4999999) {
            this.setState({error: 'bigFile'});
            return;
        }
        const f2b64 = file => {
            return new Promise(resolve => {
                var reader = new FileReader();
                reader.onload = function(e) {
                    resolve(e.target.result);
                };
                reader.readAsDataURL(file);
            });
        };
        f2b64(file).then(v => {
            this.setState({content: v.slice(v.indexOf(',')+1)})
        });
    }
   
    // post = () => {
    //     if (!this.state.title) {
    //         this.setState({error: 'title'});
    //         return;
    //     }
    //     const {title, text, mediaFile, postType, link, anon} = this.state
    //     if (postType==='text') {
    //         if (!this.state.text) {
    //             this.setState({error: 'text'});
    //             return;
    //         }
    //         this.setState({loading: true})
    //         axios.post('/api/newTextPost', {title, text, anon}).then(res => {
    //             this.props.updatePosts(res.data);
    //             this.closeModal();
    //         })
    //     } else if (postType==='link') {
    //         if (!this.state.link) {
    //             this.setState({error: 'link'});
    //             return;
    //         }
    //         this.setState({loading: true})
    //         axios.post('/api/newLinkPost', {title, link, anon}).then(res => {
    //             this.props.updatePosts(res.data);
    //             this.closeModal();
    //         })
    //     } else {
    //         if (!this.state.mediaFile) {
    //             this.setState({error: 'media'});
    //             return;
    //         }
    //         this.setState({loading: true})
    //         var headers = {
    //             'Authorization': `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`
    //         }
    //         axios.post('https://api.imgur.com/3/image', {"image": mediaFile}, {'headers': headers}).then(res => {
    //             const {link, in_gallery} = res.data.data;
    //             console.log(link, in_gallery)
    //             axios.post('/api/newMediaPost', {title, link, anon}).then(res => {
    //                 this.props.updatePosts(res.data);
    //                 this.closeModal();
    //             })
    //         }).catch(err => {
    //             console.log(err)
    //         })
    //     }
    // }
    
    render() {
        let submit;
        const {error} = this.state
        if (error) {
            submit = <h4>{error}</h4>
        } else {
            submit = <button>Post</button>
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
                    <button className='post-text-button' onClick={() => {this.toggle()}}>Create Post</button>
                    <button className='post-media-button' onClick={() => {this.toggle()}}><i className="ion-ios-images"></i></button>
                    <button className='post-link-button' onClick={() => {this.toggle()}}><i className="ion-ios-link"></i></button>
                <Modal open={this.state.modal} toggle={() => {this.toggle('text')}}>
        
                <div className="newpost-content">
                    <button onClick={this.closeModal} className='cancel-post'>x</button>
                    <input className={this.state.error==='title' ? 'error' : null} placeholder='Title' onChange={this.handleTitleChange} maxLength='50'/>
                    {input}
                    {submit}
                </div>
                </Modal>
            </div>
        );
    }
} 

export default NewPost;