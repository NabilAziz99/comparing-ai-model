//to use this component, import it and wrap it with 
//<ThemeProvider theme={lightTheme}> component
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        // When we change it to dark mode, the text will be white
        mode: 'dark'
    }
});

export const darkTheme = createTheme({
  palette: {
      // When we change it to dark mode, the text will be white
      mode: 'light'
  }
});

export default lightTheme;
