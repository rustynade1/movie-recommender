import React, { useState } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import ContactsIcon from '@mui/icons-material/Contacts';
import { Link } from 'react-router-dom';

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
 return (
    <Box
      sx={{
        width: isExpanded ? 350 : 90,
        height: '100vh',
        bgcolor: 'background.paper',
        overflow: 'auto',
        transition: 'width 0.3s ease',
		borderRight: '1px solid #000' 
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <List>
        {listItems.map((item, index) => (
          <Link to={item.path} key={item.text} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button sx={{ minHeight: '48px', fontSize: 'large'}}>
              <ListItemIcon>
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
 );
};

export default Sidebar;
