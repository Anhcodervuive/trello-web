import { Box, CircularProgress, Typography } from '@mui/material'

function PageLoadingSpinner ({ caption }) {
  return (
    <Box sx={
      {
        width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2
      }
    }>
      <CircularProgress />
      <Typography variant='h5'>{caption}</Typography>
    </Box>
  )
}

export default PageLoadingSpinner