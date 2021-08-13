import React, {Component} from 'react';
import './header.scss'

import Logo from './logo.png'
import LogoDescr from './logo-descr.svg'
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {authMeThunk, logOutMeThunk} from "../../redux/reducers/authReducer";


class Header extends Component {


    render() {
        const {isAuth, login, logOutMeThunk, id} = this.props;

        return (
            <header className="header">
                <div className="header__logo">
                    <NavLink to='/'>
                        <img src={Logo} alt=""/>
                    </NavLink>
                </div>
                <img className="header__descr" src={LogoDescr} alt=""/>
                <div className="header__auth">
                    {isAuth ?
                        (
                            <div className='header__logged'>
                                <NavLink to={`/profile/${id}`}>{login}</NavLink>
                                <button onClick={logOutMeThunk}>Log out</button>
                            </div>
                        )
                        :
                        <NavLink to='/login' className="header__unlogged">Please login</NavLink>}
                </div>
            </header>
        )
    }
}

const mapDispatchToProps = ({authReducer: {isAuth, login, id}}) => ({
    isAuth,
    login,
    id,
})

const actions = {
    authMeThunk,
    logOutMeThunk,
}

export default connect(mapDispatchToProps, actions)(Header);