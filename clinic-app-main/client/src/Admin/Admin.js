

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Header/Header';
import Medicine from './components/Medicine/Medicine';
import Patient from './components/Patient/Patient';
import Treatment from './components/Treatment/Treatment';
import Appoinment from './components/Appoinment/Appoinment';
import NotFound from '../Pages/NotFound';
import SignIn from '../Pages/SignIn';

const Admin = () => {

    const token = localStorage.getItem(process.env.REACT_APP_USER_TOKEN);  

    let route = <Redirect to='/' />

    if (token) {
        route = (
            <Switch>
                <Route path="/admin" exact component={Dashboard} />
                <Route path="/admin/dashboard" exact component={Dashboard} />
                <Route path="/admin/medicine" exact component={Medicine} />
                <Route path="/admin/patient" exact component={Patient} />
                <Route path="/admin/treatment" exact component={Treatment} />
                <Route path="/admin/appoinment" exact component={Appoinment} />
                <Route path="*" component={NotFound} />
            </Switch>
        )
    } else {
        route = (
            <Switch>
                <Route path='/admin' exact component={SignIn} />
                <Route path="/admin/dashboard" exact ><Redirect to='/admin' /></Route>
                <Route path="/admin/medicine" exact ><Redirect to='/admin' /></Route>
                <Route path="/admin/patient" exact ><Redirect to='/admin' /></Route>
                <Route path="/admin/treatment" exact ><Redirect to='/admin' /></Route>
                <Route path="/admin/appoinment" exact ><Redirect to='/admin' /></Route>
            </Switch>
        )
    }

    return (
        <div>
            {/*<Header headerPages={["dashboard", "patient", "medicine", "treatment", "appoinment"];} />*/}

            {route}
        </div>

    )
}

export default Admin;