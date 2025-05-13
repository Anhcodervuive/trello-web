import * as React from 'react';
import Container from '@mui/material/Container';

import AppBar from '~/components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';

import { fetchBoardDetailsAPI } from '~/apis/index';

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
  return (
    <Container disableGutters maxWidth={false} sx={
      { height: '100vh', }
    }>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  )
}

export default Board;