import React from 'react';
import './MyPost.scss'

const MyPost = (props) => {

    const {name, photo} = props;

    return (
        <div className="post">
            <div className="post__icon"><img src={photo} alt=""/></div>
            <div className="post__name">{name}</div>
        </div>
    )
}

export default MyPost;