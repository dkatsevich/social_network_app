import React from 'react';
import './Posts.scss'

import Post from "./Post/Post";


const Posts = () => {
    return (
		<div className="content__posts">
			<div className="content__posts-title">My posts</div>
			<form className="content__posts-form">
				<input type="text" placeholder="Your news..." className="content__posts-input"></input>
				<button className="content__posts-btn">Send</button>
			</form>
			<div className="content__posts-items">
				<Post/>
				<Post/>
				<Post/>
				<Post/>
			</div>
		</div>
    )
}

export default Posts;