import React, { Component } from "react";
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

export default App;
