import React from 'react';
import './profile.scss'

import Avatar from './myavatar.png'
import Bg from './content.jpg'


const Profile = () => {
    return (
        <div className="content">
				<img className="content__img" src={Bg} alt="" />
				<div className="content__user">
					<div className="content__user-img"><img src={Avatar} alt="" /></div>
					<div className="content__user-info">
						<div className="content__user-name">Dmitry K.</div>
						<ul className="content__user-list">
							<li className="content__user-list-item">Data of Birth: 2 November</li>
							<li className="content__user-list-item">City: Kiev</li>
							<li className="content__user-list-item">Education: BSU'11</li>
							<li className="content__user-list-item">Web Site: https://github.com/dkatsevich</li>
						</ul>
					</div>
				</div>
				<div className="content__posts">
					<div className="content__posts-title">My posts</div>
					<form className="content__posts-form">
						<input type="text" placeholder="Your news..." className="content__posts-input"></input>
						<button className="content__posts-btn">Send</button>
					</form>
					<div className="content__posts-items">
						<div className="content__posts-item">
							<div className="content__posts-icon"><img src={Avatar} alt="" /></div>
							<div className="content__posts-name">Hey, why nobody love me?</div>
						</div>
						<div className="content__posts-item">
							<div className="content__posts-icon"><img src={Avatar} alt="" /></div>
							<div className="content__posts-name">Hey, why nobody love me?</div>
						</div>
					</div>
				</div>
			</div>
    )
}

export default Profile;