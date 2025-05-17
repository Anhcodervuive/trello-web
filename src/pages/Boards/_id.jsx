import * as React from 'react';
import Container from '@mui/material/Container';

import AppBar from '~/components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';

import { mockData } from '~/apis/mock-data';

import { fetchBoardDetailsAPI, createNewCardAPI, createNewColumnAPI } from '~/apis/index';

function Board() {
  const [board, setBoard] = React.useState(null);

  React.useEffect(() => {
    const boardId = '6820b9391b72625d8dce2a5b';
    fetchBoardDetailsAPI(boardId)
      .then(board => {
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
  }

  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
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