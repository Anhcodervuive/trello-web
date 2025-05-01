import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable'

import { mapOrder } from '~/utils/sort'

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
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id);

      const newIndex = orderedColumns.findIndex(c => c._id === over.id);

      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
      setOrderedColumns(dndOrderedColumns)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
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
      </Box>
    </DndContext>
  )
}

export default BoardContent;