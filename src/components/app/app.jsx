import React from 'react';
import Header from '../header/header';
import NavBar from '../navbar/navbar';
import Profile from '../profile/profile';

import './app.scss'


const App = () => {
    return (
        <div class="wrapper">
            <Header/>
			<NavBar/>
            <Profile/>
		</div>
    )
}

export default App;