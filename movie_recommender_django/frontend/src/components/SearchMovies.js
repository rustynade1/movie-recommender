import React, { Component } from "react";
import { Box, TextField, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import missingImage from '../../static/images/missing.jpg';

export default class SearchMovies extends Component {
  constructor(props) {
     super(props);
     this.state = {
       searchTerm: '',
       movies: [
         { title: 'Movie 1', id: 1 },
         { title: 'Movie 2', id: 2 },
       ],
     };
  }
 
  handleSearchChange = (event) => {
     this.setState({ searchTerm: event.target.value });
  };
 
  render() {
     const { searchTerm, movies } = this.state;
 
     // Filter movies based on search term
     const filteredMovies = movies.filter(movie =>
       movie.title.toLowerCase().includes(searchTerm.toLowerCase())
     );
 
     return (
       <Box
         sx={{
           border: '1px solid #000',
           borderRadius: '4px',
           padding: '16px',
           margin: '16px',
         }}
       >
         <TextField
           label="Search Movies"
           variant="outlined"
           value={searchTerm}
           onChange={this.handleSearchChange}
           
           sx={{ marginBottom: '16px', width: '400px' }}
         />
         <List>
           {filteredMovies.map(movie => (
             <ListItem button key={movie.id} component={Link} to={`/movie/${movie.id}`}>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Avatar alt={movie.title} src={missingImage} sx={{ width: 56, height: 56, marginRight: '16px' }} />
                <ListItemText primary={movie.title} />
              </Box>
             </ListItem>
           ))}
         </List>
       </Box>
     );
  }
 }