import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {compose} from "redux";
import {loginMeThunk} from "../../redux/actions/authActions";

const Login = ({loginMeThunk}) => {
    const onSubmit = (formData) => {
        loginMeThunk(formData);
    }

    return (
        <div>
            <div>Login</div>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const LoginForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="email" placeholder={'Login'} component="input" type="text" />
            </div>
            <div>
                <Field name="password" placeholder={'Password'} component="input" type="text" />
            </div>
            <div>
                <Field name="rememberMe" component="input" type="checkbox" />
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const mapStateToProps = () => ({})
const actions = {
    loginMeThunk
}

export default compose(
    connect(mapStateToProps, actions)
)(Login);