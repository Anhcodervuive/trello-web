import { useState } from 'react';
import Box from '@mui/material/Box';
import Column from './Column/Column';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';

function ListColumns({ columns }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const toogleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const addNewColumn = () => {
    if (!newColumnTitle) {
      return;
    }

    toogleOpenNewColumnForm();
    setNewColumnTitle('');
  }
  return (
    <SortableContext items={columns?.map(column => column._id)} strategy={horizontalListSortingStrategy}>
      <Box
        sx={
          {
            display: 'flex',
            bgcolor: 'inherit',
            width: '100%',
            height: '100%',
            overflowX: 'auto',
            overflowY: 'hidden',
          }
        }
      >
        {
          columns?.map(column => (<Column key={column._id} column={column}/>))
        }

        {/* Box add new Column */}
        {
          !openNewColumnForm
            ?
            <Box
              sx={
                {
                  minWidth: '250px',
                  maxWidth: '250px',
                  mx: 2,
                  borderRadius: '6px',
                  height: 'fit-content',
                  bgcolor: '#ffffff3d'
                }
              }
              onClick={toogleOpenNewColumnForm}
            >
              <Button
                startIcon={<AddIcon />}
                sx={
                  {
                    color: 'white',
                    width: '100%',
                    justifyContent: 'center',
                  }
                }
              >
                Add new column
              </Button>
            </Box>
            :
            (
              <Box sx={
                {
                  minWidth: '250px',
                  maxWidth: '250px',
                  mx: 2,
                  p: 1,
                  borderRadius: '6px',
                  height: 'fit-content',
                  bgcolor: '#ffffff3d',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }
              }>
                <TextField
                  label="Enter column title..."
                  type="text"
                  size='small'
                  variant='outlined'
                  autoFocus
                  value={newColumnTitle}
                  onChange={(e) => setNewColumnTitle(e.target.value)}
                  sx={
                    {
                      '& label': { color: 'white' },
                      '& input': { color: 'white' },
                      '& label.Mui-focused': { color: 'white' },
                      '& .MuiOutlinedInput-root' : {
                        '& fieldset': { borderColor: 'white' },
                        '&:hover fieldset': { borderColor: 'white' },
                        '&.Mui-focused fieldset': { borderColor: 'white' },
                      }
                    }
                  }
                />
                <Box sx={
                  {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }
                }>
                  <Button
                    onClick={addNewColumn}
                    variant='contained'
                    color='success'
                    size='small'
                    sx={
                      {
                        boxShadow: 'none',
                        border: '0.5px solid',
                        borderColor: theme => theme.palette.success.main,
                        '&:hover' : { bgcolor: theme => theme.palette.success.main },
                      }
                    }
                  >
                      Add Column
                  </Button>
                  <CloseIcon
                    fontSize='small'
                    sx={
                      {
                        color:'white',
                        cursor: 'pointer',
                        '&:hover' : { color: theme => theme.palette.warning.light }
                      }
                    }
                    onClick={() => toogleOpenNewColumnForm()}
                  />
                </Box>
              </Box>
            )
        }
      </Box>
    </SortableContext>
  )
}

export default ListColumns;