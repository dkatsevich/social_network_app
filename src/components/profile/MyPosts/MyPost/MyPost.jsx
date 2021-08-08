import React from 'react';
import './Post.scss'

import Avatar from './../../myavatar.png'

const Post = (props) => {

	const {name} = props;

    return (
		<div className="post">
			<div className="post__icon"><img src={Avatar} alt="" /></div>
			<div className="post__name">{name}</div>
		</div>
    )
}

export default Post;