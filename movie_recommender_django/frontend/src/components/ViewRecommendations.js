import React, { Component } from "react";
import { Box, TextField, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';

export default class ViewRecommendations extends Component {
  constructor(props) {
     super(props);
     this.state = {
       movies: [
         { title: 'Movie 1', id: 1, genre: 'comedy' },
         { title: 'Movie 2', id: 2, genre: 'gaming'},
         { title: 'Movie 2', id: 2, genre: 'gaming'},
         { title: 'Movie 2', id: 2, genre: 'gaming'},
         { title: 'Movie 2', id: 2, genre: 'gaming'},
         { title: 'Movie 2', id: 2, genre: 'gaming'},
         { title: 'Movie 2', id: 2, genre: 'gaming'},
         { title: 'Movie 2', id: 2, genre: 'gaming'},
       ],
     };
  }
 
 
  render() {
     const { movies } = this.state;

     const defaultImage = "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg";
 
     // Filter movies based on search term
     const recommendedMovies = movies
     return (
      <ThemeProvider theme={theme}>
        
        <Box
            sx={{
                padding: '6%',
                width: '100%',
                bgcolor: theme.palette.background.default,
                paddingTop: '32px',
                overflowY: 'auto',
            }}
        >   <Box sx={{display: 'flex', flexWrap: 'wrap', alignItems: "center", justifyContent: "center" }}>
                <Typography variant='movieTitle' > Give These Movies a Shot </Typography>
            </Box>
            
            <List sx= {{display: 'flex', flexWrap: 'wrap', alignItems: "center", justifyContent: "center", padding: '4%'}}>
                {recommendedMovies.length > 0 ? (
                recommendedMovies.map(movie => (
                <ListItem button key={movie.id} component={Link} to={`/write-review/${movie.id}`} 
                    sx={{ 
                        alignItems: 'center', 
                        width: 300, 
                        height: 450, 
                        flexDirection: 'column', 
                        padding: 0,
                        margin: 2,
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