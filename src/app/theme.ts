import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#030A38',
      dark: '#000944',
      light: '#6866B1',
    },
    secondary: {
      main: '#31CFD0',
      dark: '#38CACE',
      light: '#2FCFCF',
    },
    error: {
      main: '#CC160B',
    },
    warning: {
      main: '#FBDC75',
    },
    success: {
      main: '#14CC70',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F0F0F0',
    },
    text: {
      primary: '#232b33',
      secondary: '#34404d',
    },
    action: {
      active: '#14cc70',
      hover: '#ff4d4d',
      selected: '#ffc926',
    },
    grey: {
      50: '#f9fafc',
      100: '#eff2f7',
      200: '#e5e9f2',
      300: '#e0e6ed',
      400: '#d3dce6',
      500: '#c0ccda',
      600: '#455566',
      700: '#34404d',
      800: '#232b33',
    },
    common: {
      black: '#030A38',
      white: '#FFFFFF',
    },
  },
});