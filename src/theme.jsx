/* eslint-disable object-curly-newline */
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '60px',
    boardBarHeight: '60px',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar' : {
            with: '8px',
            height: '8px',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '8px',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'white',
          }
        }
      }
    },
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: 'none',
          borderWidth: '0.5px',
          '&:hover' : {
            borderWidth: '1px'
          }
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          // color: theme.palette.primary.main,
          fontSize: '0.875rem',
          '&.Mui-focused': {
            color: theme.palette.primary.main,
          },
        })
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          '& fieldset': {
            borderWidth: '0.5px !important',
          },
          '&:hover fieldset': {
            borderWidth: '2px !important',
          },
          '&.Mui-focused fieldset': {
            borderWidth: '2px !important',
          },
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          '& fieldset': {
            borderWidth: '0.5px !important',
          },
          '&:hover fieldset': {
            borderWidth: '2px !important',
          },
          '&.Mui-focused fieldset': {
            borderWidth: '2px !important',
          },
        }
      }
    }
  },
})

export default theme;