import React from 'react';
import axios from 'axios';

export default class Trending extends React.Component {
    constructor() {
        super();
        this.state = {
            trending: []
        }
    }
    
    componentDidMount() {
        axios.get('/api/trending').then(res => {this.setState({trending: res.data})})
    }
    render() {
        let trending =  this.state.trending.map(post => {
            return  <div key={post.id} className='trending-post' style={{backgroundImage: `linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0)), url(${post.media})`}}>
                        <a href={post.text}><h1>{post.title}</h1></a>
                    </div>
        });
        return (
            <div className='trending-container'>
                <h2>Trending Stories</h2>
                {trending}
            </div>
        )
    }
}