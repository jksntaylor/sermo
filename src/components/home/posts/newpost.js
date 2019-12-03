import React from 'react';
import { Modal } from 'shards-react';
import axios from 'axios';

class NewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            title: "",
            content: "",
            type: "text",
            mediaType: "file",
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
            this.setState({error: 'Please choose a file smaller than 5MB'});
            return;
        }
        const f2b64 = file => {
            return new Promise(resolve => {
                let reader = new FileReader();
                reader.onload = function(e) {
                    resolve(e.target.result);
                };
                reader.readAsDataURL(file);
            });
        };
        f2b64(file).then(v => {
            this.setState({content: v.slice(v.indexOf(",")+1), mediaType: "file"})
        });
    }

    handleMediaLink = value => {
        this.handleChange("content", value)
        this.setState({mediaType: "link"})
    }

    finishPost = data => {
        this.props.updatePosts(data);
        this.toggle('text');
    }

    post = () => {
        const {title, content, type, mediaType} = this.state;
        if (!title&&type!=='link') {
            this.setState({error: "Don't Forget a Title!"});
            return;
        }
        if (!content) {
            this.setState({error: "You Need Something to Post!"});
            return;
        }
        if (type==='text') {
            axios.post('/api/newPost/text', {title, content}).then(res => {this.finishPost(res.data)})
        } else if (type==='media') {
            if (mediaType==='link') {
                axios.post('/api/newPost/mediaLink', {title, content}).then(res => {this.finishPost(res.data)})
            } else {
                const headers = {'Authorization': `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`}
                axios.post('https://api.imgur.com/3/image', {"image": content}, {"headers": headers}).then(res => {
                    const {link} = res.data.data;
                    axios.post('/api/newPost/mediaFile', {title, link}).then(res => {this.finishPost(res.data)})
                })
            }
        } else {
            axios.post('/api/newPost/link', {title, content}).then(res => {this.finishPost(res.data)})
        };
    }
    
    render() {
        const { type, error, content } = this.state;
        let submit = error ? <h4>{error}</h4> : <button onClick={this.post}>Post</button>;
        let input = type==='text' ? <textarea placeholder="What's on Your Mind?" onChange={e => {this.handleChange('content', e.target.value)}}/>
        : type==='link' ? <input value={content} placeholder="Link an Article Here!" onChange={e => {this.handleChange('content', e.target.value)}}/>
        :   <div>
            <input type="file" accept="image/*, video/*" onChange={e => {this.checkMedia(e)}}/>
            <h2>or</h2>
            <input value={content} placeholder="Link an Image Here!" onChange={e => {this.handleMediaLink(e.target.value)}}/>
            </div>;
        return (
            <div className='newpost'>
                <button className='post-text-button' onClick={() => {this.toggle('text')}}>Create Post</button>
                <button className='post-media-button' onClick={() => {this.toggle('media')}}><i className="ion-ios-images"></i></button>
                <button className='post-link-button' onClick={() => {this.toggle('link')}}><i className="ion-ios-link"></i></button>
                <Modal open={this.state.modal} toggle={() => {this.toggle('text')}}>
                    <div className="newpost-content">
                        {type==="link" ? null : <input placeholder='Title' onChange={e => {this.handleChange('title', e.target.value)}} maxLength='50'/>}
                        {input}
                        {submit}
                    </div>
                </Modal>
            </div>
        );
    }
} 

export default NewPost;