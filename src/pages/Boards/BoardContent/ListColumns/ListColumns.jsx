import Box from '@mui/material/Box';
import Column from './Column/Column';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

function ListColumns({ columns }) {
  return (
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
      <Box
        sx={
          {
            minWidth: '200px',
            maxWidth: '200px',
            mx: 2,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d'
          }
        }
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
    </Box>
  )
}

export default ListColumns;