/* eslint-disable object-curly-newline */
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

const APP_BAR_HEIGHT = '60px';
const BOARD_BAR_HEIGHT = '60px';
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight : BOARD_CONTENT_HEIGHT,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar' : {
            width: '8px',
            height: '8px',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '8px',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'white',
          },
          '*::-webkit-scrollbar-track': { margin: '8px' }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&&.MuiTypography-body1': {
            fontSize: '0.875rem',
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