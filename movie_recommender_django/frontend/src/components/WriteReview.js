import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';

const WriteReview = () => {
    const [reviewText, setReviewText] = useState('');
   
    const handleReviewChange = (event) => {
       setReviewText(event.target.value);
    };
   
    const handleSubmitReview = () => {
       // Handle the review submission logic here
       console.log('Review submitted:', reviewText)
        const reviewArray = []
        const reviewData = {
            // 918940 - The Legend of Tarzan
            // 70047 - The Exorcist
            id: '918940',
            userText: reviewText
        }

        reviewArray.push(reviewData)
        const reviewDetails = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reviewDetails: reviewArray
          }),
        };
        fetch("/api/recommend-movie", reviewDetails)
          .then((response) => response.json())
          .then((data) => console.log(data));

       // Reset the review text
       setReviewText('');
    };

    const defaultImage = "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg";

    const movie = { title: 'Movie 1', id: 1, genre: 'comedy', image: null, description: 'When the menace known achaos on the people of e.ce.When the menace known achaos on the people of e.ce.When the menace known achaos on the people of e.ce.When the menace known achaos on the people of e.ce.When the menace known achaos on the people of e.ce.' }; // DONT FORGET TO CHANGE 

    const backgroundStyle = `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${defaultImage || movie.image})`;
   
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ 
                // padding: '5%', 
                width: '100%', hegiht: '100vh',
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-start',
                bgcolor: theme.palette.background.default, 
                
                }}>

                <Box sx= {{
                    display: 'flex', flexDirection: 'row', width: '100%', height: '40%', 
                    paddingBottom: '5%',
                    background: backgroundStyle,
                }}>

                    <Box 
                        sx={{ 
                            marginBottom: '16px', 
                            height: '40%',
                            maxHeight: '40%',
                            paddingLeft: '10%', 
                            paddingTop: '32px',
                            width: '80%',
                            display: 'flex',
                            flexDirection: 'column',
                            
                        }}>
                        <Typography variant='movieTitle'> {movie.title} </ Typography>
                        <Typography variant='genre' sx={{paddingBottom: '25px'}}> {movie.genre} </Typography>
                        <Typography variant='description' sx={{
                            maxHeight: '20%', 
                            width: '70%',
                            // display: '-webkit-box',
                            // WebkitLineClamp: 20,
                            // WebkitBoxOrient: 'vertical',
                            // textOverflow: 'ellipsis',
                            // overflow: 'hidden'
                        }}>
                            {movie.description} 
                        </Typography>
                    </Box>
                    {/* <Box
                        component="img"
                        sx={{
                            height: 400,
                            width: 250, 
                            maxHeight: '100%', 
                            maxWidth: 350, 
                            objectFit: 'cover',
                            justify: 'flex-end'
                        }}
                        alt={movie.title}
                        src={movie.image || defaultImage}
                        /> */}
                </Box>
                
                <Box sx={{
                        paddingLeft: '20%', paddingTop: '3%', 
                        width: '60%',
                        display: 'flex', flexDirection: 'column', alignItems: 'flex-end'
                    }}>
                    <TextField
                        label="Write your review"
                        multiline
                        rows={7}
                        variant="outlined"
                        value={reviewText}
                        onChange={handleReviewChange}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmitReview}
                        sx={{ marginTop: '16px' }}
                    >
                        Submit Review
                    </Button>
                </Box>
                
            </Box>
        </ThemeProvider>
        
    );
};
   
export default WriteReview;