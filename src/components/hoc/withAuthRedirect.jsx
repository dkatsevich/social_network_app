import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const mapStateToProps = ({authReducer: {isAuth}}) => ({
    isAuth
})

const withAuthRedirect = (Wrapped) => {
    const withRedirect = (props) => {

        if (!props.isAuth) return <Redirect to='/login'/>

        return (
            <Wrapped {...props}/>
        )
    }

    return connect(mapStateToProps)(withRedirect)
}


export default withAuthRedirect;