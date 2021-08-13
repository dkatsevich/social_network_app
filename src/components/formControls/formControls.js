import React from "react";
import './formControls.scss'

const withFormValidate = (Tag) => (props) => {
    const {input, meta: {touched, error}, ...restProps} = props;
    const hasError = touched && error;
    return (
        <div className={hasError ? '_validate_error' : ""}>
            <Tag {...input} {...restProps}/>
            {hasError ? <span className='_error'>{error}</span> : null}
        </div>
    )
}

const Input = withFormValidate('input');
const Textarea = withFormValidate('textarea');

export {
    Input,
    Textarea
}