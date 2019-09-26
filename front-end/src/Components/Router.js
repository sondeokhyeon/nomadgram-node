import React from "react"
import PropTypes from "prop-types";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";

const LoggendInRoutes = () => 
<>
    <Route exact path="/" component={Feed}></Route>
</>


const LoggendOutRoutes = () => 
<>
    <Route exact path="/" component={Auth}></Route>
</>

const AppRouter = ({ isLoggedIn }) => (
    <Router>
        <Switch>
            {isLoggedIn ? <LoggendInRoutes/>:<LoggendOutRoutes/>}
        </Switch>
    </Router>
)

AppRouter.propTypes = {
    isLoggedIn : PropTypes.bool.isRequired
}

export default AppRouter;
