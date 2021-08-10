import React from 'react';
import MyPost from "./MyPost/MyPost";

import './MyPosts.scss'
import {addPost} from "../../../redux/actions/profileActions";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, mustRequire} from "../../utils/validation";
import {Input, Textarea} from "../../formControls/formControls";

const maxLength10 = maxLengthCreator(10);

let AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className="posts__form">
            <Field name={'newPost'}
                   type="text"
                   placeholder="Your news..."
                   className="posts__input"
                   component={Input}
                   validate={[mustRequire, maxLength10]}
            />
            <button className="posts__btn">Send</button>
        </form>
    )
}

AddPostForm = reduxForm({form: 'postForm'})(AddPostForm);

const MyPosts = ({posts, addPost, photos}) => {

    const addMessage = (formData) => {
        console.log(formData.newPost);
        addPost(formData.newPost)
    }

    const postItems = posts.map(post => {
        return (
            <MyPost key={post.id} name={post.body} photo={photos.small}/>
        )
    })

    return (
        <div className="posts">
            <div className="posts__title">My posts</div>
            <AddPostForm onSubmit={addMessage}/>
            <div className="posts__items">
                {postItems}
            </div>
        </div>
    )
}

const mapStateToProps = ({profileReducer: {posts}}) => ({posts});
const action = {
    addPost,
}

export default connect(mapStateToProps, action)(MyPosts);