import React, { Component } from "react";
// import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
// import { alertActions } from "./store/actions/alerts.actions";

import LoginForm from "./forms/Login/Login";
import Signup from "./forms/Signup/Signup";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="logo-text">vocabulous</h1>
        <LoginForm />
        <Signup />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

export default connect(mapStateToProps)(App);
