/* eslint-disable object-curly-newline */
import {
  cyan, deepOrange, orange, teal
} from '@mui/material/colors';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '60px',
    boardBarHeight: '60px',
  },
  colorSchemes: {
    light: { // palette for light mode
      palette: {
        primary: teal,
        secondary: deepOrange
      },
    },
    dark: { // palette for dark mode
      palette: {
        primary: cyan,
        secondary: orange
      },
    }
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: 'none',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem',
          '&.Mui-focused': {
            color: theme.palette.primary.main,
          },
        })
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.light
          },
          '&:hover' : {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main
            },
          },
          '& fieldset': {
            borderWidth: '1px !important',
          },
        })
      }
    }
  },
})

export default theme;