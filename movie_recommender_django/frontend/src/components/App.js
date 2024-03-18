import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import SideBar from "./SideBar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // return <p>yuh</p>;
    return (
      <Router>
        <SideBar />
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          {/* <Route path="/about" element={<h1>yoooo2</h1>} /> */}
        </Routes>
      </Router>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);