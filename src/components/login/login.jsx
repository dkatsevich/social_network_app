import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {compose} from "redux";
import {maxLengthCreator, mustRequire} from "../utils/validation";
import {Input} from "../formControls/formControls";
import './login.scss'
import {Redirect, withRouter} from "react-router-dom";
import {loginMeThunk} from "../../redux/reducers/authReducer";

const Login = ({loginMeThunk, isAuth, captchaUrl}) => {
    const onSubmit = (formData) => {
        loginMeThunk(formData);
    }

    if (isAuth) {
        return <Redirect to='/profile'/>
    }

    return (
        <div className='login'>
            <div className='login__title'>Login page</div>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    )
}

const maxLength150 = maxLengthCreator(150)


const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form className='login__form' onSubmit={handleSubmit}>
            <div className='login__input'>
                <Field name="email"
                       placeholder={'Login'}
                       component={Input}
                       type="text"
                       validate={[mustRequire, maxLength150]}
                />
            </div>
            <div className='login__input'>
                <Field name="password"
                       placeholder={'Password'}
                       component={Input}
                       type="text"
                       validate={[mustRequire, maxLength150]}
                />
            </div>
            <label className='login__checkbox'>
                <Field name="rememberMe" component="input" type="checkbox" />
                <span>Remember me</span>
            </label>
            {captchaUrl &&
                <div>
                    <img src={captchaUrl} style={{margin: '20px'}} alt=""/>
                    <div className='login__input'>
                        <Field name="captcha"
                               placeholder='Write captcha here...'
                               component={Input}
                               type="text"
                               validate={[mustRequire]}
                        />
                    </div>

                </div>
            }
            <div className='login__btn'>
                <button>Submit</button>
            </div>
            {
                error
                &&
                <div className="login__error"><span>{error}</span></div>
            }
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const mstp = ({authReducer: {isAuth, captchaUrl}}) => ({isAuth, captchaUrl})
const actions = {
    loginMeThunk
}

export default compose(
    withRouter,
    connect(mstp, actions)
)(Login);