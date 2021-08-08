import React from 'react';
import {Route, Switch} from "react-router-dom";

import Header from '../header/header';
import NavBar from '../navbar/navbar';

import './app.scss'

import Dialogs from "../dialogs/dialogs";
import ProfileContainer from "../profile/profile";
import UsersContainer from "../users/users";
import Auth from "../auth/auth";


const App = () => {
    return (
        <div className="wrapper">
            <Header/>
            <NavBar/>
            <div className="content">
                <Switch>
                    <Route path='/profile/:id?' render={
                        ({match}) => <ProfileContainer id={match.params.id}/>
                    }/>
                    <Route path='/dialogs' component={Dialogs}/>
                    <Route path='/users' component={UsersContainer}/>
                    <Route path='/auth' component={Auth}/>
                </Switch>
            </div>
        </div>
    )
}

export default App;