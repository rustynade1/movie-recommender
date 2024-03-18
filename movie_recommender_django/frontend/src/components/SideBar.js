import React, { useState } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import ContactsIcon from '@mui/icons-material/Contacts';

const Sidebar = () => {
 const [isExpanded, setIsExpanded] = useState(false);

 const handleMouseEnter = () => {
    setIsExpanded(true);
 };

 const handleMouseLeave = () => {
    setIsExpanded(false);
 };

 return (
    <Box
      sx={{
        width: isExpanded ? 240 : 90,
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
        {['View Reviews', 'Write a Revie', 'Search for Movies'].map((text, index) => (
          <ListItem button key={text} sx={{ minHeight: '48px', fontsize: 'small'}}>
            <ListItemIcon >
              {index === 0 && <PeopleIcon />}
              {index === 1 && <PeopleIcon />}
              {index === 2 && <ContactsIcon />}
            </ListItemIcon>
            <ListItemText primary={text} sx={{ visibility: isExpanded ? 'visible' : 'hidden', whiteSpace: 'nowrap', overflow: 'hidden' }} />
          </ListItem>
        ))}
      </List>
    </Box>
 );
};

export default Sidebar;
