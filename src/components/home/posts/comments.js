import React from 'react';

export default function Comments (props) {
        if (props.comments) {
            var comments = props.comments.map(comment => {
                const {author, text, date} = comment;
                return (
                    <div key={comment.id}>
                        <h1>{author}</h1>
                        <h2>{date}</h2>
                        <p>{text}</p>
                    </div>
                )
            })
        }
        return (
            <div>
                {comments}
            </div>
        )
}