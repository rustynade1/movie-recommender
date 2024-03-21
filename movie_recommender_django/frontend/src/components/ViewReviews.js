import React, { Component } from "react";
import { Box, TextField, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';

export default class ViewReviews extends Component {
  constructor(props) {
     super(props);
     this.state = {
       searchTerm: '',
       reviews: [
         { title: 'Movie 1', id: 1, genre: 'comedy' },
         { title: 'Movies, 2', id: 2, genre: 'gaming'},
         { title: 'Movie! 2', id: 2, genre: 'gaming'},
         { title: 'Movie@ 2', id: 2, genre: 'gaming'},
         { title: 'Movie 2', id: 2, genre: 'gaming'},
         { title: 'Movie 2', id: 2, genre: 'gaming'},
         { title: 'Movie 2', id: 2, genre: 'gaming'},
         { title: 'Movie 2', id: 2, genre: 'gaming'},
       ],
     };
  }
 
  handleSearchChange = (event) => {
     this.setState({ searchTerm: event.target.value });
  };
 
  render() {
    const { searchTerm, reviews } = this.state;

    const defaultImage = "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg";
    
    const relatedMovies = [
        { title: 'Movie 1', genre: 'comedy' },
        { title: 'Movies, 2', genre: 'gaming'},
        { title: 'Movie 3', genre: 'comedy' },
        { title: 'Movie 4 long title', genre: 'comedy' },
        { title: 'Movie 5', genre: 'comedy' },
    ]
    
     // Filter movies based on search term
    const filteredReviews = reviews.filter(reviews =>
        reviews.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
 
    return (
       <ThemeProvider theme={theme}>
        <Box
            sx={{
            width: '100%',
            bgcolor: theme.palette.background.default,
            overflowY: 'auto',
            }}
        >
            <Box 
            sx={{
                paddingTop: '32px', paddingBottom: '32px', paddingLeft: '4%',
                width: '100%',
                bgcolor: theme.palette.primary.dark,
                overflowY: 'auto',
            }}>

            <TextField
                label="Search Reviews"
                variant="outlined"
                value={searchTerm}
                onChange={this.handleSearchChange}
                
                sx={{  width: '400px', color: theme.palette.secondary.main}}
            />
            </Box>
            
                <List sx= {{display: 'flex', flexWrap: 'wrap', alignItems: "center", justifyContent: "center", padding: '6%', paddingTop: '4%'}}>
                {filteredReviews.length > 0 ? (
                    filteredReviews.map(movie => (
                        <ListItem key={movie.title} component={Link} to={`/write-review/${encodeURIComponent(movie.title.toLowerCase().replace(/\s+/g, '-'))}`} 
                            sx={{ 
                                width: '30%', 
                                height: 220, 
                                display: 'flex',
                                flexDirection: 'row', 
                                padding: 0,
                                margin: 2,
                            }}>
                            <Paper 
                                sx={{ 
                                    width: '100%', 
                                    height: '100%', 
                                    display: 'flex',
                                    flexDirection: 'row', // Ensure the Paper component is also a flex container
                                }}>
                                <Box
                                    component="img"
                                    sx={{
                                        height: '100%',
                                        width: '30%', // Adjust the width to take up half of the Paper's width
                                        objectFit: 'cover',
                                        alignItems: 'center',
                                        borderTopLeftRadius: 'inherit',
                                        borderBottomLeftRadius: 'inherit',
                                    }}
                                    alt={movie.title}
                                    src={movie.image || defaultImage}
                                />
                                /*<Box
                                    sx={{
                                        borderRadius: '4px',
                                        margin: 0, padding: 0,
                                        width: "100%",
                                        display: 'flex',
                                        flexDirection: 'column',
                                        marginRight: 0,
                                    }}>
                                    <ListItemText primary={movie.title} secondary={movie.genre} sx={{padding: 2}}/>
                                    <Box sx={{
                                        bgcolor: theme.palette.secondary.main, borderBottomRightRadius: 'inherit',
                                        width: '100%', paddingLeft: 2,  boxSizing: 'border-box',
                                    }}>
                                    <Typography variant="subtitle2" sx={{paddingTop: 1, color: theme.palette.background.paper,}}> Perhaps you would like these:  </Typography>
                                    <List sx={{display: 'flex', flexWrap: 'wrap', paddingTop: 0}}>
                                        {relatedMovies.map((relatedMovie) => (
                                            <Typography key={relatedMovie.title} component={Link} to={`/write-review/${encodeURIComponent(relatedMovie.title.toLowerCase().replace(/\s+/g, '-'))}`}
                                            sx={{
                                                '&:hover': { textDecoration: 'underline' },
                                                marginRight: 2,
                                                color: theme.palette.background.paper,
                                            }}>
                                            {relatedMovie.title}
                                        </Typography>
                                        ))}
                                    </List>
                                    </Box>

                                </Box>
                            </Paper>
                        </ListItem>
                    ))
                    ) : (
                    <Box sx={{ textAlign: 'center', width: '100%', height: '100vh' }}>
                        <Typography color="textPrimary" variant='h2'>Sorry, nothing seems to come up...</Typography>
                    </Box>
                    )}
                </List>
            </Box>
        </ThemeProvider>
    );
  }
 }