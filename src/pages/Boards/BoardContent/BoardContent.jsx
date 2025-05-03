import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable'
import { mapOrder } from '~/utils/sort'
import { cloneDeep } from 'lodash';

import Column from './ListColumns/Column/Column';
import Card from './ListColumns/Column/ListCards/Card/Card';

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COL',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  // Nếu dùng pointer sensor mặc định thì phải kết hợp thêm thuộc tính css touchAction : none
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } });
  // Yêu cầu chuột phải duy chuyển 10px trước khi gọi event, fix trường hợp click bị gọi event
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });
  // Nhấn giữ 250ms và dung sai của cảm ứng 500px thì mới kích hoạt event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } });
  // Ưu tiên sử dụng 2 loại sensor dưới để trên mobile k bị bug
  const sensors = useSensors(mouseSensor, touchSensor);
  const [orderedColumns, setOrderedColumns] = useState([]);

  // Cùng 1 thời điểm chỉ có một phần tử được kéo (Column hoặc card)
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null);
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId));
  }

  const handleDragStart = (e) => {
    setActiveDragItemId(e?.active?.id);
    setActiveDragItemType(e?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN);
    setActiveDragItemData(e?.active?.data?.current)

    // Nếu là kéo card thì mới thực hiện hành động set old column
    if (e?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(e?.active?.id));
    }
  }

  // Trigger trong quá trình kéo 1 phần tử
  const handleDragOver = (e) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return ;

    const { active, over } = e;

    if (!over || !active) return;

    // Active là card đang được kéo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active;
    // Over là card đang tương tác với card đang được kéo
    const { id: overCardId } = over;

    // Tìm ra 2 column của 2 cái card trên
    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overCardId);

    if (!activeColumn || !overColumn) return;

    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns(prevColumns => {
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

        // Login tính toán cho card index mới
        let newCardIndex;
        const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height;
        const modifier = isBelowOverItem ? 1 : 0;
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1;

        // Clone orderedColumnsState cũ để xử lý dữ liệu sau đó dùng mảng đó để cập nhật lại OrderedColumnsState mới
        const nextColumns = cloneDeep(prevColumns);
        const nextActiveColumns = nextColumns.find(column => column._id === activeColumn._id);
        const nextOverColumns = nextColumns.find(column => column._id === overColumn._id);

        if (nextActiveColumns) {
          // Xóa card ra khỏi column active (là column cũ chúng ta kéo card ra khỏi)
          nextActiveColumns.cards = nextActiveColumns.cards.filter(card => card._id !== activeDragItemId)

          // Cập nhật lại thứ tự card
          nextActiveColumns.cardOrderIds = nextActiveColumns.cards.map(card => card._id);
        }
        if (nextOverColumns) {
          // Kiểm tra xem card đang kéo có ở cái overColum chưa nếu có thì xóa nó đi
          nextOverColumns.cards = nextOverColumns.cards.filter(card => card._id !== activeDragItemId)
          // Thêm card vào column over (là column mới chúng ta kéo card vào)
          nextOverColumns.cards = nextOverColumns.cards.toSpliced(newCardIndex, 0, activeDragItemData)
          // Cập nhật lại thứ tự card
          nextOverColumns.cardOrderIds = nextOverColumns.cards.map(card => card._id);
        }

        return nextColumns;
      })
    }
  }

  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (!over || !active) return;

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // Active là card đang được kéo
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active;
      // Over là card đang tương tác với card đang được kéo
      const { id: overCardId } = over;

      // Tìm ra 2 column của 2 cái card trên
      const activeColumn = findColumnByCardId(activeDraggingCardId);
      const overColumn = findColumnByCardId(overCardId);

      if (!activeColumn || !overColumn) return;

      // Hành động kéo thả card trong 2 column khác nhau phải dùng đến biến oldColumnWhenDraggingCard
      // Vì trong quá trình handle dragOver đã cập nhật lại state activeColumn = overColumn nên không thể so sánh điều kiện
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        //
      } else {
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId);

        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId);
        // Dùng arrayMove tương tự như kéo column trong 1 board
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex);

        setOrderedColumns(prevColumns => {
          // Clone orderedColumnsState cũ để xử lý dữ liệu sau đó dùng mảng đó để cập nhật lại OrderedColumnsState mới
          const nextColumns = cloneDeep(prevColumns);

          const targetColumn = nextColumns.find(column => column._id === overColumn._id);

          targetColumn.cards = dndOrderedCards;
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)

          return nextColumns
        })
      }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && active.id !== over.id) {
      const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id);

      const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id);

      const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex);
      setOrderedColumns(dndOrderedColumns)
    }
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnWhenDraggingCard(null);
  }

  const dropAnimation = { sideEffects : defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } }) }

  return (
    <DndContext
    // Thuật toán phát hiện va chạm (Nếu không có nó thì card với cover lớn sẽ không kéo qua column được vì lúc này nó đang bị conflick giữa card và column),
    // Chúng ta sẽ dùng closestConners thay vì closetCenter
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}>
      <Box sx={
        {
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          width: '100%',
          height: theme => theme.trello.boardContentHeight,
          p: '10px 0',
        }
      }>
        {/* Box column */}
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {(!activeDragItemType) && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent;