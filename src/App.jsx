import Button from '@mui/material/Button';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { green } from '@mui/material/colors';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import {
  useColorScheme,
} from '@mui/material/styles';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
}

function App() {

  return (
    <>
      <ModeToggle />
      <div>Du dep trai</div>
      <Typography variant="body2" component="h2" color="text.secondary" gutterBottom>
        h1. Heading
      </Typography>
      <Button variant="text" color='secondary'>Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Stack direction="row" spacing={3}>
        <Icon>add_circle</Icon>
        <Icon color="primary">add_circle</Icon>
        <Icon sx={{ color: green[500] }}>add_circle</Icon>
        <Icon fontSize="small">add_circle</Icon>
        <Icon sx={{ fontSize: 30 }}>add_circle</Icon>
      </Stack>
    </>
  )
}

export default App
