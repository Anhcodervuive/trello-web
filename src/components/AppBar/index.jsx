import Box from '@mui/material/Box';
import ModeSelect from '~/components/ModeSelect';
import AppsIcon from '@mui/icons-material/Apps';
import { createSvgIcon } from '@mui/material/utils';
import Typography from '@mui/material/Typography';
import WorkSpaces from './Menus/WorkSpaces';
import Recent from './Menus/Recent';
import Started from './Menus/Started';
import Templates from './Menus/templates';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/material/Tooltip';
import Profile from './Menus/Profile';

const TrelloIcon = createSvgIcon(<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19.5 2h-15A2.5 2.5 0 0 0 2 4.5v15A2.5 2.5 0 0 0 4.5 22h15a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 19.5 2m-8.8 15.2a1.2 1.2 0 0 1-1.2 1.2H5.8c-.66 0-1.2-.54-1.2-1.2V5.8a1.2 1.2 0 0 1 1.2-1.2h3.7c.66 0 1.2.54 1.2 1.2zm8.7-5c0 .66-.54 1.2-1.2 1.2h-3.7c-.66 0-1.2-.54-1.2-1.2V5.8c0-.66.54-1.2 1.2-1.2h3.7c.66 0 1.2.54 1.2 1.2z"/></svg>, 'TrelloIcon');

function AppBar() {
  return (
    <Box px={2} sx={
      {
        width: '100%',
        height: theme => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }
    }>
      <Box sx={
        {
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }
      }>
        <AppsIcon sx={{ color: 'primary.main' }} />
        <Box sx={
          {
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }
        }>
          <TrelloIcon sx={{ color: 'primary.main' }} inheritViewBox/>
          <Typography variant='span' sx={
            {
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: 'primary.main'
            }
          }>Trello
          </Typography>
        </Box>
        <WorkSpaces />
        <Recent />
        <Started />
        <Templates />
        <Button variant="outlined">Create</Button>
      </Box>
      <Box sx={
        {
          width: '100%',
          height: theme => theme.trello.appBarHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          gap: 1
        }
      }>
        <TextField id="outlined-search" label="Search field" type="search..." size='small'/>
        <ModeSelect />
        <Tooltip title="Notification" >
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon />
          </Badge>
        </Tooltip>
        <Tooltip title="Notification" >
          <HelpOutlineIcon sx={{ cursor: 'pointer' }}/>
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  )
}

export default AppBar;