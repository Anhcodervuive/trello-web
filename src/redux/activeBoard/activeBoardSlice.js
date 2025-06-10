import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { API_ROOT } from '~/utils/contants';
import { generatePlaceholderCard } from '~/utils/formatters';
import { mapOrder } from '~/utils/sort';

const initialState = {
  currentActiveBoard: null,
}

// Những hành động gọi API bất đồng bộ và cập nhật dữ liệu vào redux thì sẽ dùng middleware createAsyncThunk đi kèm với
// extraReducer

export const fetchBoardDetailAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailAPI',
  async (boardId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  reducers: {
    // Luôn luôn cần 1 cập ngoặc nhọn cho func trong reducer dù code chỉ có 1 dòng vì redux có thể k chấp nhận
    updateCurrentActiveBoard: (state, action) => {
      // action.payload là chuẩn đặt tên nhận dữ liệu vào reducer, ở đây chúng ta gán nó vào 1 biến có ý nghĩa hơn
      const fullBoard = action.payload;

      state.currentActiveBoard = fullBoard;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoardDetailAPI.fulfilled, (state, action) => {
        // action.payload là dữ liệu trả về từ API
        const board = action.payload;

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

        state.currentActiveBoard = board;
      })
      .addCase(fetchBoardDetailAPI.rejected, (state, action) => {
        // Có thể dùng để set trạng thái lỗi
        console.error('Fetch board detail failed:', action.payload);
      });
  }
})

export const { updateCurrentActiveBoard } = activeBoardSlice.actions;

// Selector: nơi dành cho các component bên dưới gọi bằng hook useSelector để lấy dữ liệu
// từ trong redux store ra xử dụng
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard;
};

export default activeBoardSlice.reducer;