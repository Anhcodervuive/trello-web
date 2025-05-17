import * as React from 'react';
import Container from '@mui/material/Container';
import { isEmpty } from 'lodash';


import AppBar from '~/components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import { generatePlaceholderCard } from '~/utils/formatters';

import {
  fetchBoardDetailsAPI, createNewCardAPI, createNewColumnAPI
} from '~/apis/index';

function Board() {
  const [board, setBoard] = React.useState(null);

  React.useEffect(() => {
    const boardId = '6820b9391b72625d8dce2a5b';
    fetchBoardDetailsAPI(boardId)
      .then(board => {
        board.columns.forEach(column => {
          // Cần xử lý vấn đề kéo thả vào 1 column rỗng
          if (isEmpty(column.cards)) {
            column.cards= [generatePlaceholderCard(column)]
            column.cardOrderIds = [generatePlaceholderCard(column)._id]
          }
        })
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

  return (
    <Container disableGutters maxWidth={false} sx={
      { height: '100vh', }
    }>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} createNewColumn={createNewColumn} createNewCard={createNewCard} />
    </Container>
  )
}

export default Board;