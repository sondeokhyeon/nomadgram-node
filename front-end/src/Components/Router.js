import React from "react"
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import Auth from "../Routes/Auth/";
import Feed from "../Routes/Feed";

const LoggendInRoutes = () => (
    <>
        <Route exact path="/" component={Feed} />
    </>
);


const LoggendOutRoutes = () => (
    <>
        <Route exact path="/" component={Auth} />
    </>
)

const AppRouter = ({ isLoggedIn }) => (
    <Switch>{isLoggedIn ? <LoggendInRoutes />:<LoggendOutRoutes />}</Switch>
)

AppRouter.propTypes = {
    isLoggedIn : PropTypes.bool.isRequired
}

export default AppRouter;
