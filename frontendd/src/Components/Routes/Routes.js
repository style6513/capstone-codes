import React from "react";
import {  Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
const Routes = ({ login, signup }) => {
    console.debug(
        "Routes",
        `login=${typeof login} signup=${typeof signup}`
    )
    return(
    <Switch>
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