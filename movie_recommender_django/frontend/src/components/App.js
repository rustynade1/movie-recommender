import React, { Component } from "react";
import { render } from "react-dom";
import SideBar from "./SideBar";
import SearchMovies from "./SearchMovies";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
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
          <Route path="/" element={<Navigate to="/search-movies" replace />} />
          <Route path="/search-movies" element={<SearchMovies />} />
        </Routes>
      </Router>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);