import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark', 
        primary: {
            main: '#6a1b9a',
        },
        secondary: {
            main: '#81d4fa',
        },
        background: {
            default: '#303030',
            paper: '#424242'
        },
    },

    typography: {
        
        movieTitle: {
            fontSize: '6rem',
            fontWeight: 'bold',
            color: '#ffffff',
            fontFamily: 'Roboto Mono, monospace',
        },
        genre: {
            fontSize: '1.5rem',
            fontStyle: 'italic',
            color: '#ffffff',
            fontFamily: 'Roboto Mono, monospace',
        },
        description: {
            fontSize: '1rem',
            color: '#cccccc',
            fontFamily: 'Roboto Mono, monospace',
            
        },
    },
});

export default theme;