import React, { Component } from "react";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PrivateRoute  from './components/PrivateRoute'

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import ADsetsForm from './pages/ADsetsForm';
import ADCopie from './pages/ADCopie';
import CreateAds from './pages/CreateAds';
import Dashboard from './pages/Dashboard';



class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;

    

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
        {currentUser ? (
          
          
          
         
            <div className="navbar-collapse collapse justify-content-between">

              <ul className="navbar-nav mr-auto">
              <NavLink to={"/"} className="navbar-brand">
            OBM
          </NavLink>
              
              <li className="nav-item">
                <NavLink to={"/Dashboard"} className="nav-link">
                DASHBOARD
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/ADsetsForm"} className="nav-link">
                ADSETS
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/ADCopie"} className="nav-link">
                ADCREATIVES
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/CreateAds"} className="nav-link">
                ADS
                </NavLink>
              </li>
              </ul>
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink to={"/profile"} className="nav-link">
                  PROFILE
                </NavLink>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
              </ul>
            </div>
            
          ):(
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink to={"/login"} className="nav-link" activeClassName="active">
                  Login
                </NavLink>
              </li>
              </ul>
          ) }
        
          </nav>
        <div className="container mt-3">
          <Switch>
            <PrivateRoute exact path={["/", "/home"]} component={Home}/>
            <PrivateRoute exact path="/register" component={Register} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute path="/user" component={BoardUser} />
            <PrivateRoute path="/mod" component={BoardModerator} />
            <PrivateRoute path="/admin" component={BoardAdmin} />
            <PrivateRoute path='/Dashboard' exact component={Dashboard} />
            <PrivateRoute path='/ADsetsForm' exact component={ADsetsForm} />
            <PrivateRoute path='/ADCopie' exact component={ADCopie} />
            <PrivateRoute path='/CreateAds' exact component={CreateAds} />

            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;