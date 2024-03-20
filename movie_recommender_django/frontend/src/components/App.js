import React, { Component } from "react";
import { render } from "react-dom";
import SideBar from "./SideBar";
import SearchMovies from "./SearchMovies";
import WriteReview from "./WriteReview";
import ViewRecommendations from "./ViewRecommendations";
// import theme from './theme';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
// import { ThemeProvider } from '@mui/material/styles';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // return <p>yuh</p>;
    return (
      // <ThemeProvider theme={theme}>
        <Router>
          <SideBar />
          <Routes>
            <Route path="/" element={<Navigate to="/search-movies" replace />} />
            <Route path="/search-movies" element={<SearchMovies />} />
            <Route path="/write-review/:id" element={<WriteReview />} />
            <Route path="/view-recommendations" element={<ViewRecommendations />} />
          </Routes>
        </Router>
      // </ThemeProvider>
      
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);