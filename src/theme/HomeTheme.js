import { createTheme } from '@mui/material/styles';

const HomeTheme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#2563EB',
      light: '#60A5FA',
      dark: '#1D4ED8',
      contrastText: '#fff',
    },

    secondary: {
      main: '#7C3AED',
    },

    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },

    text: {
      primary: '#0F172A',
      secondary: '#64748B',
    },

    success: {
      main: '#22C55E',
    },

    warning: {
      main: '#F59E0B',
    },

    error: {
      main: '#EF4444',
    },

    divider: '#E2E8F0',
  },

  typography: {
    fontFamily: ['Inter', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),

    h1: {
      fontWeight: 800,
      fontSize: '4rem',
      lineHeight: 1.1,
    },

    h2: {
      fontWeight: 800,
      fontSize: '3rem',
    },

    h3: {
      fontWeight: 700,
      fontSize: '2.3rem',
    },

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 700,
    },

    h6: {
      fontWeight: 700,
    },

    subtitle1: {
      color: '#64748B',
    },

    body1: {
      fontSize: '1rem',
      lineHeight: 1.8,
    },

    button: {
      fontWeight: 600,
      textTransform: 'none',
      fontSize: '0.95rem',
    },
  },

  shape: {
    borderRadius: 14,
  },

  spacing: 8,

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          backgroundColor: '#F8FAFC',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },

        '*': {
          boxSizing: 'border-box',
        },

        html: {
          scrollBehavior: 'smooth',
        },

        a: {
          textDecoration: 'none',
          color: 'inherit',
        },
      },
    },

    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          boxShadow: 'none',
          transition: '.25s',

          '&:hover': {
            boxShadow: '0 8px 25px rgba(37,99,235,.25)',
          },
        },

        contained: {
          boxShadow: 'none',
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 10px 30px rgba(15,23,42,.06)',
          transition: '.3s',

          '&:hover': {
            transform: 'translateY(-5px)',
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 18,
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },
  },
});

export default HomeTheme;
