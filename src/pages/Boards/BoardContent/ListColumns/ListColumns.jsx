import { useState } from 'react';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Column from './Column/Column';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { createNewColumnAPI } from '~/apis';
import { generatePlaceholderCard } from '~/utils/formatters';
import { cloneDeep } from 'lodash';
import { selectCurrentActiveBoard, updateCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice';

function ListColumns({ columns }) {
  const board = useSelector(selectCurrentActiveBoard);
  const dispatch = useDispatch()
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const toogleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error('Please enter column title', {
        theme: 'colored',
        position: 'bottom-right',
      });
      return;
    }

    const newColumnData = { title: newColumnTitle }
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    // Khi mới tạo column thì chưa có card, cần xử lý vấn đề kéo thả bằng vào column mới bằng cách để 1 placeholder card
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    // Dính lỗi object is not extensible khi cố gắng thêm thuộc tính mới vào object
    // Dù đã sử dụng spread operator để tạo ra object mới nhưng bản chất của spread operator là shadow clone
    // Nên dính phải rule Immutability trong redux toolkit không dùng được hàm push, sửa giá trị mảng trực tiếp
    const newBoard = cloneDeep(board)
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    dispatch(updateCurrentActiveBoard(newBoard))

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
          columns?.map(column => (
            <Column
              key={column._id}
              column={column}
            />
          ))
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
                    className='interceptor-loading'
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