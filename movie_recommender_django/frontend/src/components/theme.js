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
});

export default theme;