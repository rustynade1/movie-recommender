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
      movieReviewContent: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMovieTitleChange = this.handleMovieTitleChange.bind(this);
    this.handleMovieReviewContentChange = this.handleMovieReviewContentChange.bind(this);
  }

  handleSubmit(e) {
    const reviewDetails = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        movieTitle: this.state.movieTitle,
        movieReviewContent: this.state.movieReviewContent,
      }),
    };
    fetch("/api/recommend-movie", reviewDetails)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  handleMovieTitleChange(e) {
    this.setState({
      movieTitle: e.target.value,
    });
  }

  handleMovieReviewContentChange(e) {
    this.setState({
      movieReviewContent: e.target.value,
    });
  }

  render() {
    return (
      <FormControl>
        <FormLabel>Enter Movie Title</FormLabel> 
          <TextField 
            onChange={this.handleMovieTitleChange}
            defaultValue={''}/>
        <FormLabel>Enter Movie Review</FormLabel> 
          <TextField 
            onChange={this.handleMovieReviewContentChange}
            defaultValue={''}/>
        <Button onClick={this.handleSubmit}>Submit</Button>
      </FormControl>
    );
  }
}