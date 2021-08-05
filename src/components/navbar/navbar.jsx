import React from 'react';
import './navbar.scss'

import Friend1 from './friend1.png'
import Friend2 from './friend2.png'
import Friend3 from './friend3.png'

const NavBar = () => {
    return (
        <div className="nav">
				<ul className="nav__list">
					<li className="nav__list-item">
						<a href="#" className="nav__link">Profile</a>
					</li>
					<li className="nav__list-item">
						<a href="#" className="nav__link">Messages</a>
					</li>
					<li className="nav__list-item">
						<a href="#" className="nav__link">News</a>
					</li>
					<li className="nav__list-item">
						<a href="#" className="nav__link">Music</a>
					</li>
					<li className="nav__list-item last">
						<a href="#" className="nav__link">Settings</a>
					</li>
				</ul>
				<div className="nav__friends">
					<div className="nav__friends-title">Friends</div>
					<div className="nav__friends-row">
						<div className="nav__friends-item">
							<div className="nav__friends-icon"><img src={Friend1} alt="" /></div>
							<div className="nav__friends-name">James</div>
						</div>
						<div className="nav__friends-item">
							<div className="nav__friends-icon"><img src={Friend2} alt="" /></div>
							<div className="nav__friends-name">Alan</div>
						</div>
						<div className="nav__friends-item">
							<div className="nav__friends-icon"><img src={Friend3} alt="" /></div>
							<div className="nav__friends-name">Marcus</div>
						</div>
					</div>
				</div>
			</div>
    )
}

export default NavBar;