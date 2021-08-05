import React from 'react';
import './header.scss'

import Logo from './logo.png'
import LogoDescr from './logo-descr.svg'


const Header = () => {
    return (
        <header className="header">
            <div className="header__logo">
                <a href="#">
                    <img src={Logo} alt="" />
                </a>
            </div>
            <img className="header__descr" src={LogoDescr} alt="" />
        </header>
    )
}

export default Header;