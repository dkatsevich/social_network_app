import React, {Component} from 'react';
import './header.scss'

import Logo from './logo.png'
import LogoDescr from './logo-descr.svg'
import {connect} from "react-redux";
import {authMeThunk, putUserData} from "../../redux/actions/authActions";


class Header extends Component {
    componentDidMount() {
        this.props.authMeThunk()
    }

    render() {
        const {isAuth, login} = this.props;

        return (
            <header className="header">
                <div className="header__logo">
                    <a href="#">
                        <img src={Logo} alt=""/>
                    </a>
                </div>
                <img className="header__descr" src={LogoDescr} alt=""/>
                <div className="header__auth">
                    {isAuth ? login : <a href="#" className="login">Please login</a>}
                </div>
            </header>
        )
    }
}

const mapDispatchToProps = ({authReducer: {isAuth, login, id}}) => ({
    isAuth,
    login
})

const actions = {
    putUserData,
    authMeThunk,
}

export default connect(mapDispatchToProps, actions)(Header);