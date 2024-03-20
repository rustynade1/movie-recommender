import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';




const WriteReview = () => {
    const [reviewText, setReviewText] = useState('');
   
    const handleReviewChange = (event) => {
       setReviewText(event.target.value);
    };
   
    const handleSubmitReview = () => {
       // Handle the review submission logic here
       console.log('Review submitted:', reviewText);
       // Reset the review text
       setReviewText('');
    };

    const defaultImage = "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg";

    const movie = { title: 'Movie 1', id: 1, genre: 'ariana grande', image: null }; // DONT FORGET TO CHANGE 
   
    return (
        <Box sx={{ 
                padding: '5%', 
                maxWidth: '75%', 
                width: '75%', 
                display: 'flex', 
                flexDirection: 
                'column', 
                alignItems: 'flex-start' }}>
            <Box sx= {{display: 'flex', flexDirection: 'row', width: '100%', paddingBottom: '5%'}}>

                <Box 
                    sx={{ 
                        marginBottom: '16px', 
                        height: '40%',
                        padding: '5px', 
                        width: '80%',
                        marginRight: '10%'
                    }}>
                    <Typography variant='h2'> {movie.title} </ Typography>
                    <Typography variant='h5'> {movie.genre} </Typography>
                    <Typography variant='body2'> When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice. </Typography>
                </Box>
                <Box
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
                    />
            </Box>
            
            <TextField
                label="Write your review"
                multiline
                rows={4}
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
    );
};
   
export default WriteReview;