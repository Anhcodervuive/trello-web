import Box from '@mui/material/Box';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt';
import FilterListIcon from '@mui/icons-material/FilterList';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import { capitalizeFirstLetter } from '~/utils/formatters'

const MENU_STYLES = {
  backgroundColor: 'transparent',
  color: 'white',
  border: 'none',
  paddingX: '5px',
  borderRadius: '5px',
  '.MuiSvgIcon-root': { color: 'white' },
  '&:hover': { bgcolor: 'primary.100' }
}

function BoardBar({ board }) {
  return (
    <Box
      px={2}
      sx={
        {
          width: '100%',
          height: theme => theme.trello.boardBarHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          overflowX: 'auto',
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          borderBottom: 1,
          borderColor: 'white'
        }
      }>
      <Box sx={
        {
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }
      }>
        <Tooltip title={board?.description} arrow>
          <Chip
            sx={
              MENU_STYLES
            }
            icon={<DashboardIcon />}
            label={board?.title}
            clickable
          />
        </Tooltip>
        <Chip
          sx={
            MENU_STYLES
          }
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
        />
        <Chip
          sx={
            MENU_STYLES
          }
          icon={<AddToDriveIcon />}
          label="Add to google drive"
          clickable
        />
        <Chip
          sx={
            MENU_STYLES
          }
          icon={<BoltIcon />}
          label="Automation "
          clickable
        />
        <Chip
          sx={
            MENU_STYLES
          }
          icon={<FilterListIcon />}
          label="Filter "
          clickable
        />
      </Box>
      <Box sx={
        {
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }
      }>
        <Button
          variant="outlined" startIcon={<PersonAddAlt1Icon />}
          sx={
            {
              color: 'white',
              borderColor: 'white',
              '&:hover': { borderColor: 'white' },
            }
          }
        >
            Invite
        </Button>
        <AvatarGroup max={4} sx={
          {
            gap: 1,
            '& .MuiAvatar-root' : {
              width: '30px',
              height: '30px',
              fontSize: '1rem',
              border: 'none',
              cursor : 'pointer',
              '&:first-of-style' : { bgcolor: '#a4b0de' }
            }
          }
        }>
          <Tooltip title="Remy Sharp" arrow>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title="Andy Yang" arrow>
            <Avatar alt="Andy Yang" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title="Bai Lu" arrow>
            <Avatar alt="Bai Lu" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title="Ao rui peng" arrow>
            <Avatar alt="Ao rui peng" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title="Liu shi shi" arrow>
            <Avatar alt="Liu shi shi" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          {/* <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" /> */}
        </AvatarGroup>
      </Box>
    </Box>
  );
}

export default BoardBar;