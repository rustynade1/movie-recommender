import React, { useState } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import ContactsIcon from '@mui/icons-material/Contacts';
import { Link } from 'react-router-dom';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';

const Sidebar = () => {
 const [isExpanded, setIsExpanded] = useState(false);

 const handleMouseEnter = () => {
    setIsExpanded(true);
 };

 const handleMouseLeave = () => {
    setIsExpanded(false);
 };

 const listItems = [
    { text: 'Search for Movies', path: '/search-movies', icon: <ContactsIcon /> },
    { text: 'View Reviews', path: '/view-reviews', icon: <HomeIcon /> },
    { text: 'View Recommendations', path: '/view-recommendations', icon: <PeopleIcon /> },
 ];

 const iconStyle = {
    display: "flex",
    justifyContent: "center",
    margin: "auto",
    "& svg": {
      fontSize: "40px"
    },
    marginRight: '16px',
    color: '#fff'
 };

 return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: isExpanded ? 400 : 100,
          height: '100vh',
          bgcolor: theme.palette.primary.main, // Use the main color from the theme
          overflow: 'auto',
          transition: 'width 0.3s ease',
          color: theme.palette.primary.contrastText
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <List sx={{ marginTop: '16px' }}>
          {listItems.map((item, index) => (
            <Link to={item.path} key={item.text} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button sx={{ minHeight: '60px'}}>
                <ListItemIcon sx={iconStyle}>
                 {item.icon}
                </ListItemIcon>
                <ListItemText 
                 primary={item.text} 
                 sx={{ 
                    visibility: isExpanded ? 'visible' : 'hidden', 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden',
                 }} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </ThemeProvider>
 );
};

export default Sidebar;