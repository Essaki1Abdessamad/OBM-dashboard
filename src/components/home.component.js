import React, { Component } from "react";

import UserService from "../services/user.service";

import QuickStat from "./DashComp/QuickStat";
import LineChart from "./DashComp/LineChart";
import PieChart from "./DashComp/PieChart";
import AuthService from "../services/auth.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }


 componentDidMount() {
  } 

  render() {
    return (
      <div className="container">
       
        <header className="jumbotron">
         {/*  <h3>{this.state.content}</h3> */}
         <QuickStat />
        <div className="row mt-2 g-4">
          <LineChart />
          <PieChart />        
      </div>
        </header>
        
      </div>
    );
  }
}