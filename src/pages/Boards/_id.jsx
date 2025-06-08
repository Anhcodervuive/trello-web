import * as React from 'react';
import Container from '@mui/material/Container';
import { isEmpty } from 'lodash';


import AppBar from '~/components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import { generatePlaceholderCard } from '~/utils/formatters';
import { mapOrder } from '~/utils/sort'

import {
  fetchBoardDetailsAPI,
  createNewCardAPI,
  createNewColumnAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardTodifferentColumnAPI,
} from '~/apis/index';
import {
  Box, CircularProgress, Typography
} from '@mui/material';

function Board() {
  const [board, setBoard] = React.useState(null);

  React.useEffect(() => {
    const boardId = '6820b9391b72625d8dce2a5b';
    fetchBoardDetailsAPI(boardId)
      .then(board => {
        // Sắp xếp thứ tự column ở đây trước khi đưa xuống
        board.columns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
        board.columns.forEach(column => {
          // Cần xử lý vấn đề kéo thả vào 1 column rỗng
          if (isEmpty(column.cards)) {
            column.cards= [generatePlaceholderCard(column)]
            column.cardOrderIds = [generatePlaceholderCard(column)._id]
          } else {
            column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
          }
        })
        // console.log('first board: ', board)
        setBoard(board);
      })
      .catch((error) => {
        console.error('Error fetching board details:', error);
      });
  }, []);

  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    // Khi mới tạo column thì chưa có card, cần xử lý vấn đề kéo thả bằng vào column mới bằng cách để 1 placeholder card
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })

    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
  }

  // Khi kéo thả column xong xuôi thì gọi API cập nhật lại columnOrderIds
  const moveColumn = (dndOrderedColumns) => {
    console.log(dndOrderedColumns);
    const dndOrderedColumnIds = dndOrderedColumns.map(column => column._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(newBoard)

    // API update board
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })
  }

  // Khi duy chuyển card trong cùng column
  // Gọi API để cập nhật mảng cardOrderIds của column chứa nó
  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)

    // Gọi API update column
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  // Cập nhật lại mảng cardOrderIds của column ban đầu chứa nó
  // Cập nhật lại mảng cardOrderIds của column tiếp theo
  // Cập nhật lại trường columnId mới của card vừa kéo
  const moveCardInDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    console.log('currentCardId: ', currentCardId)
    console.log('prevColumnId: ', prevColumnId)
    console.log('nextColumnId: ', nextColumnId)
    console.log('dndOrderedColumns: ', dndOrderedColumns)

    console.log(dndOrderedColumns);
    const dndOrderedColumnIds = dndOrderedColumns.map(column => column._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(newBoard)

    moveCardTodifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds: dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds,
    })
  }

  if (!board) {
    return (
      <Box sx={
        {
          width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2
        }
      }>
        <CircularProgress />
        <Typography variant='h5'>Loading board ...</Typography>
      </Box>
    )
  }

  return (
    <Container disableGutters maxWidth={false} sx={
      { height: '100vh', }
    }>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumn={moveColumn}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardInDifferentColumn={moveCardInDifferentColumn}
      />
    </Container>
  )
}

export default Board;