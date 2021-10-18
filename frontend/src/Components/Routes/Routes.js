import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "../Login/Login";
import RegisterPage from "../Register/Register";
import HomePage from "../Homepage/Homepage";
import PrivateRoute from "./PrivateRoutes";
const Routes = ({ login, signup }) => {
    console.debug(
        "Routes",
        `login=${typeof login} signup=${typeof signup}`
    )
    return (
        <Switch>
     
            <Route exact path="/login">
                <LoginPage login={login} />
            </Route>
            <Route exact path="/register">
                <RegisterPage signup={signup} />
            </Route>
            <PrivateRoute exact path="/codes">
                <HomePage />
            </PrivateRoute>
            <Redirect to="/" />
        </Switch>
    )
}
export default Routes;