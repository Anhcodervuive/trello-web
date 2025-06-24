import * as React from 'react';
import Container from '@mui/material/Container';

import AppBar from '~/components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';

import {
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardTodifferentColumnAPI,
} from '~/apis/index';
import {
  fetchBoardDetailAPI,
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice';

import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';
import { useParams } from 'react-router-dom';
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner';

function Board() {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const board = useSelector(selectCurrentActiveBoard);

  React.useEffect(() => {
    dispatch(fetchBoardDetailAPI(boardId))
  }, [boardId, dispatch]);

  // Khi kéo thả column xong xuôi thì gọi API cập nhật lại columnOrderIds
  const moveColumn = (dndOrderedColumns) => {
    console.log(dndOrderedColumns);
    const dndOrderedColumnIds = dndOrderedColumns.map(column => column._id)

    // const newBoard = { ...board }
    const newBoard = cloneDeep(board) // Sử dụng cloneDeep để tránh lỗi Immutability
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    dispatch(updateCurrentActiveBoard(newBoard))

    // API update board
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })
  }

  // Khi duy chuyển card trong cùng column
  // Gọi API để cập nhật mảng cardOrderIds của column chứa nó
  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    dispatch(updateCurrentActiveBoard(newBoard))

    // Gọi API update column
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  // Cập nhật lại mảng cardOrderIds của column ban đầu chứa nó
  // Cập nhật lại mảng cardOrderIds của column tiếp theo
  // Cập nhật lại trường columnId mới của card vừa kéo
  const moveCardInDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map(column => column._id)

    const newBoard = cloneDeep(board)
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    dispatch(updateCurrentActiveBoard(newBoard))

    let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
    // Xử lý trường hợp chỉ còn lại 1 card trong column (1 card orderIds và 1 placeholderCard)
    // sao khi kéo card đó ra khỏi column cũ thì k gửi id card placeholder lên
    prevCardOrderIds = prevCardOrderIds.filter(cardId => !cardId.includes('placeholder-card'))
    moveCardTodifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds,
    })
  }

  if (!board) {
    return (
      <PageLoadingSpinner caption='...Loading board' />
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

        moveColumn={moveColumn}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardInDifferentColumn={moveCardInDifferentColumn}
      />
    </Container>
  )
}

export default Board;