import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Cloud from '@mui/icons-material/Cloud';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import AddCardIcon from '@mui/icons-material/AddCard';
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import ListCards from './ListCards/ListCards';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';

import { mapOrder } from '~/utils/sort'
import { toast } from 'react-toastify';

function Column({ column, createNewCard }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column._id, data: { ...column } });

  const dndkitColumnStyles = {
    // touchAction: 'none', // Dành cho sensor default dạng pointer sensor
    // Nếu sử dụng CSS.Tranform có thể sẽ bị lỗi strecth
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openNewCardForm, setOpenNewCardForm] = useState(false);
  const toogleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm);
  const [newCardTitle, setNewCardTitle] = useState('');
  const addNewCard = async () => {
    if (!newCardTitle) {
      toast.error('Please enter card title', {
        theme: 'colored',
        position: 'bottom-left',
      });
      return;
    }

    const createdCard = await createNewCard({
      title: newCardTitle,
      columnId: column._id
    })

    toogleOpenNewCardForm();
    setNewCardTitle('');
  }
  return (
    <Box
      ref={setNodeRef}
      style={dndkitColumnStyles}
      {...attributes}
      {...listeners}
      sx={
        {
          minWidth: '300px',
          maxWidth: '300px',
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
        }
      }
    >
      {/* Box column header */}
      <Box sx={
        {
          height: (theme) => theme.trello.columnHeaderHeight,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }
      }>
        <Typography
          variant='h6'
          sx={
            {
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }
          }
        >
          {column?.title}
        </Typography>
        <Box>
          <Tooltip title="More options">
            <ExpandMoreIcon
              id="basic-button-column-dropdown"
              aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{ color: 'text.primary', cursor: 'pointer' }}
            />
          </Tooltip>
          <Menu
            id="basic-menu-column-dropdown"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={
              { 'aria-labelledby': 'basic-button-column-dropdown"', }
            }
          >
            <MenuItem>
              <ListItemIcon>
                <AddCardIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Add card</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentCut fontSize="small" />
              </ListItemIcon>
              <ListItemText>Cut</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentCopy fontSize="small" />
              </ListItemIcon>
              <ListItemText>Copy</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentPaste fontSize="small" />
              </ListItemIcon>
              <ListItemText>Paste</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <DeleteOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Remove this column</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Cloud fontSize="small" />
              </ListItemIcon>
              <ListItemText>Archive this column</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      {/* Box column list card */}
      <ListCards cards={orderedCards} />
      {/* Box column footer */}
      <Box sx={
        {
          height: (theme) => theme.trello.columnFooterHeight,
          p: 2,
        }
      }>
        {
          !openNewCardForm
            ?
            (
              <Box sx={
                {
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }
              }>
                <Button
                  startIcon={<AddCardIcon />}
                  onClick={toogleOpenNewCardForm}
                >
                Add new card
                </Button>
                <Tooltip title="Drag to move">
                  <DragHandleIcon sx={{ cursor: 'pointer' }} />
                </Tooltip>
              </Box>
            )
            :
            (
              <Box sx={
                {
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }
              }>
                <TextField
                  label="Enter card title..."
                  type="text"
                  size='small'
                  variant='outlined'
                  autoFocus
                  data-no-dnd="true"
                  value={newCardTitle}
                  onChange={(e) => setNewCardTitle(e.target.value)}
                  sx={
                    {
                      '& label': { color: theme => theme.palette.primary.main },
                      '& input': { color: theme => theme.palette.primary.main },
                      '& label.Mui-focused': { color: theme => theme.palette.primary.main },
                      '& .MuiOutlinedInput-root' : {
                        '& fieldset': { borderColor: theme => theme.palette.primary.main },
                        '&:hover fieldset': { borderColor: theme => theme.palette.primary.main },
                        '&.Mui-focused fieldset': { borderColor: theme => theme.palette.primary.main },
                      }
                    }
                  }
                />
                <Button
                  onClick={addNewCard}
                  variant='contained'
                  color='success'
                  size='small'
                  data-no-dnd="true"
                  sx={
                    {
                      boxShadow: 'none',
                      border: '0.5px solid',
                      borderColor: theme => theme.palette.success.main,
                      '&:hover' : { bgcolor: theme => theme.palette.success.main },
                    }
                  }
                >
                Add
                </Button>
                <CloseIcon
                  onClick={toogleOpenNewCardForm}
                  fontSize='small'
                  data-no-dnd="true"
                  sx={
                    {
                      color: theme => theme.palette.warning.main,
                      cursor: 'pointer',
                    }
                  }
                />
              </Box>
            )
        }
      </Box>
    </Box>
  );
}

export default Column;