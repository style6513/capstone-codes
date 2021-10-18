import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "../Login/Login";
import RegisterPage from "../Register/Register";
const Routes = ({ login, signup }) => {
    console.debug(
        "Routes",
        `login=${typeof login} signup=${typeof signup}`
    )
    return (
        <Switch>
            <Route exact path="/">

            </Route>
            <Route exact path="/login">
                <LoginPage login={login} />
            </Route>
            <Route exact path="/register">
                <RegisterPage signup={signup} />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}
export default Routes;