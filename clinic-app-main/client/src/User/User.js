import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Appoinment from './components/Appoinment/Appoinment';
import Profile from './components/Profile/Profile';
import NotFound from '../Pages/NotFound';
import SignIn from './Pages/SignIn/SignIn'
import SignUp from './Pages/SignUp/SignUp';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import ChangePassword from './Pages/ChangePasword/ChangePassword';

import { SET_TOKEN } from '../User/Redux/Action/ActionTypes';


const User = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem(process.env.REACT_APP_USER_TOKEN);

    useEffect(() => {
        if (token) {
            dispatch({ type: SET_TOKEN, payload: token });
        }
    }, [token])

    let route = <Redirect to='/' />

    if (token) {
        route = (
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/changepassword" exact component={ChangePassword} />
                <Route path="/appoinment" exact component={Appoinment} />
                <Route path="/profile" exact component={Profile} />
                <Route path="*" component={NotFound} />
            </Switch>
        )
    } else {
        route = (
            <Switch>
                <Route path='/' exact component={SignIn} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/forgot-password" exact component={ForgotPassword} />
                <Route path="/dashboard" exact component={SignIn} />
                <Route path="/changepassword" exact component={SignIn} />
                <Route path="/appoinment" exact component={SignIn} />
                <Route path="/profile" exact component={Profile} />
                <Route path="*" component={NotFound} />
            </Switch>
        )
    }

    return (
        <div>
            {/*<Header headerPages={["dashboard", 'appoinment']} />*/}
            {route}
        </div>

    )
}

export default User;