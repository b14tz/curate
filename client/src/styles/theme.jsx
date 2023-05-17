import { createTheme } from "@mui/material/styles";
import '../styles/fonts/Fredoka/FredokaVariable.ttf';
import '../styles/fonts/Kanit/Kanit-ExtraBold.ttf';


const theme = createTheme({
  palette: {
    primary: {
      main: '#2F294B',
    },
    secondary: {
      main: '#d17f5b',
    },
    custom: {
      light: '#ffa726',
      main: '#f57c00',
      dark: '#ef6c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: 'Fredoka',
    header: {
        fontFamily: 'Kanit',
        fontWeight: 600,
        color: "#2F294B",
        fontSize: 40,
    },
    h6: {
      fontWeight: 400
    }
  },
});

export default theme;
