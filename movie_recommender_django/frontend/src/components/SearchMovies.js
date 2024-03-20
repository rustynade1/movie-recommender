import React, { Component } from "react";
import { Box, TextField, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';

export default class SearchMovies extends Component {
  constructor(props) {
     super(props);
     this.state = {
       searchTerm: '',
       movies: [
         { title: 'Movie 1', id: 1, genre: 'ariana grande' },
         { title: 'Movie 2', id: 2, genre: 'gaming'},
       ],
     };
  }
 
  handleSearchChange = (event) => {
     this.setState({ searchTerm: event.target.value });
  };
 
  render() {
     const { searchTerm, movies } = this.state;

     const defaultImage = "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg";
 
     // Filter movies based on search term
     const filteredMovies = movies.filter(movie =>
       movie.title.toLowerCase().includes(searchTerm.toLowerCase())
     );
 
     return (
      <ThemeProvider theme={theme}>
       <Box
         sx={{
           padding: '4%',
           width: '100%',
           bgcolor: theme.palette.background.default,
           paddingTop: '32px',
         }}
       >
         <TextField
           label="Search Movies"
           variant="outlined"
           value={searchTerm}
           onChange={this.handleSearchChange}
           
           sx={{ marginBottom: '16px', width: '400px', }}
         />
        <List sx= {{display: 'flex', flexDirection: 'row'}}>
          {filteredMovies.length > 0 ? (
            filteredMovies.map(movie => (
              <ListItem button key={movie.id} component={Link} to={`/write-review/${movie.id}`} 
                sx={{ 
                  alignItems: 'center', 
                  width: 350, 
                  height: 450, 
                  flexDirection: 'column', 
                  padding: 0,
                  marginRight: 6,
                  marginBottom: 6,
                }}>
                <Paper 
                  sx={{ 
                    width: '100%', 
                    height: '100%', 
                  }}>
                  <Box
                    component="img"
                    sx={{
                        height: 300,
                        width: '100%', 
                        maxHeight: 300, 
                        maxWidth: 350, 
                        objectFit: 'cover',
                        alignItems: 'center',
                        borderTopLeftRadius: 'inherit',
                        borderTopRightRadius: 'inherit',
                    }}
                    alt={movie.title}
                    src={movie.image || defaultImage}
                    />
                    <Box 
                    sx={{
                        borderRadius: '4px',
                        margin: '16px',
                        width: "100%"
                    }}>
                    <ListItemText primary={movie.title} secondary={movie.genre}/>
                  </Box>
                </Paper>
                
              </ListItem>
            ))
            ) : (
              <Box sx={{ textAlign: 'center', width: '100%', height: '100vh' }}>
                <Typography color="textPrimary" variant='h2'>Sorry, we can't seem to find that...</Typography>
              </Box>
            )}
          </List>
        </Box>
      </ThemeProvider>
    );
  }
 }