import React from "react";

const FormField = (props) => {
    const hasError = props.touched && props.error;
    console.log(props.touched);
    return (
        <div>
            {props.children}
            {hasError ? <span>{props.error}</span> : null}
        </div>
    )
}

const Input = (props) => {
    const {input, meta, ...restProps} = props;
    return (
        <FormField {...meta}>
            <input {...input} {...restProps}/>
        </FormField>
    )
}

const Textarea = (props) => {
    const {input, meta, ...restProps} = props;
    return (
        <FormField {...meta}>
            <textarea {...input} {...restProps}/>
        </FormField>
    )
}


export {
    Input,
    Textarea
}