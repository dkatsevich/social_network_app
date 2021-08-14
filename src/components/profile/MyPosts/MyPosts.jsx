import React, {Component} from 'react';
import MyPost from "./MyPost/MyPost";

import './MyPosts.scss'
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, mustRequire} from "../../utils/validation";
import {Input} from "../../formControls/formControls";
import {addPost} from "../../../redux/reducers/profileReducer";

const maxLength100 = maxLengthCreator(100);

let AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className="posts__form">
            <Field name={'newPost'}
                   type="text"
                   placeholder="Your news..."
                   className="posts__input"
                   component={Input}
                   validate={[mustRequire, maxLength100]}
            />
            <button className="posts__btn">Send</button>
        </form>
    )
}

AddPostForm = reduxForm({form: 'postForm'})(AddPostForm);

class MyPosts extends Component {
    render() {

        let {posts, addPost, photo} = this.props;
        const addMessage = (formData) => {
            addPost(formData.newPost)
        }

        const postItems = posts.map(post => {
            return (
                <MyPost key={post.id} name={post.body} photo={photo}/>
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
}


const mapStateToProps = ({profileReducer: {posts}}) => ({posts});
const action = {
    addPost,
}

export default connect(mapStateToProps, action)(MyPosts);