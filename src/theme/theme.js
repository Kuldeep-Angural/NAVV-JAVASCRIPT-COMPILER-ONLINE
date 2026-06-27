import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#22c55e',
      light: '#4ade80',
      dark: '#16a34a',
      contrastText: '#ffffff',
    },

    secondary: {
      main: '#52525b',
    },

    background: {
      default: '#f8fafc',
      paper: '#52525b',
    },

    text: {
      primary: '#18181b',
      secondary: '#52525b',
    },
  },

  shape: {
    borderRadius: 12,
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',

    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 18px',
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 18,
        },
      },
    },
  },
});

export default theme;
