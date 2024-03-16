import React, { Component } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    
    super(props);
    this.state = {
      movieTitle: '',
      movieReview: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const reviewDetails = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        movieTitle: this.state.movieTitle,
        movieReview: this.state.movieReview,
      }),
    };
    fetch("/api/recommend-movie", reviewDetails)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }


  render() {
    return (
      <FormControl>
        <FormLabel>Enter Movie Title</FormLabel> <TextField />
        <FormLabel>Enter Movie Review</FormLabel> <TextField />
        <Button onClick={this.handleSubmit}>Submit</Button>
      </FormControl>
    );
  }
}