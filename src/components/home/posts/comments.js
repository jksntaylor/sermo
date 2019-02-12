import React from 'react';
import Comment from './comment';

export default function Comments (props)  {
    var comments = props.comments.map(comment => {
        return (
            <Comment key={comment.id} comment={comment} handleNewComment={props.handleNewComment}/>
        )
    });

    return (
        <div>
            {comments}
        </div>
    )
}
