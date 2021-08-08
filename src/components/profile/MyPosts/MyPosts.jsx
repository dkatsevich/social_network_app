import React from 'react';
import MyPost from "./MyPost/MyPost";

import './MyPosts.scss'
import {addPost, updatePost} from "../../../redux/actions/profileActions";
import {connect} from "react-redux";


const MyPosts = ({posts, newPost, addPost, updatePost, photos}) => {
    const changeInput = (e) => {
        updatePost(e.target.value);

    }

    const addMessage = (e) => {
        e.preventDefault();
        addPost()
    }

    const postItems = posts.map(post => {
        return (
            <MyPost key={post.id} name={post.body} photo={photos.small}/>
        )
    })

    return (
        <div className="posts">
            <div className="posts__title">My posts</div>
            <form onSubmit={addMessage} className="posts__form">
                <input onChange={changeInput} type="text" placeholder="Your news..." value={newPost}
                       className="posts__input"></input>
                <button className="posts__btn">Send</button>
            </form>
            <div className="posts__items">
                {postItems}
            </div>
        </div>
    )
}

const mapStateToProps = ({profileReducer: {posts, newPost}}) => ({posts, newPost});
const action = {
    addPost,
    updatePost
}

export default connect(mapStateToProps, action)(MyPosts);