import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Header from '../header/header';
import NavBar from '../navbar/navbar';

import './app.scss'

import {connect, Provider} from "react-redux";
import Spinner from "../spinner/spinner";
import {processInitialize} from "../../redux/reducers/appReducer";
import store from "../../redux/store";
import {compose} from "redux";
import ErrorBoundary from "../errorBoundary/errorBoundary";

const Dialogs = React.lazy(() => import("../dialogs/dialogs"));
const ProfileContainer = React.lazy(() => import("../profile/profile"));
const UsersContainer = React.lazy(() => import("../users/users"));
const Login = React.lazy(() => import("../login/login"));

class App extends React.Component {
    componentDidMount() {
        this.props.processInitialize()
    }

    render() {
        const {initialized} = this.props;

        if (!initialized) return <Spinner/>

        return (
            <div className="wrapper">
                <Header/>
                <NavBar/>
                <div className="content">
                    <Switch>
                        <React.Suspense fallback={<Spinner/>}>
                            <Route path='/profile/:userId?' render={
                                ({match}) => <ProfileContainer userId={match.params.userId}/>
                            }/>
                            <Route path='/dialogs' component={Dialogs}/>
                            <Route path='/users' component={UsersContainer}/>
                            <Route path='/login' component={Login}/>
                        </React.Suspense>
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({appReducer: {initialized}}) => ({
    initialized
})

const actions = {
    processInitialize
}

const AppContainer = connect(mapStateToProps, actions)(App);


const SuperApp = () => {
    return (
        <Provider store={store}>
            <ErrorBoundary>
                <Router>
                    <AppContainer/>
                </Router>
            </ErrorBoundary>
        </Provider>
    )
}




export default SuperApp;