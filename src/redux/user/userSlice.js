import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import authorizeAxiosInstance from '~/utils/authorizeAxios';
import { API_ROOT } from '~/utils/contants';

const initialState = {
  currentUser: null,
}

// Những hành động gọi API bất đồng bộ và cập nhật dữ liệu vào redux thì sẽ dùng middleware createAsyncThunk đi kèm với
// extraReducer

export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data, { rejectWithValue }) => {
    try {
      const res = await authorizeAxiosInstance.post(`${API_ROOT}/v1/users/login`, data);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUserAPI = createAsyncThunk(
  'user/logoutUserAPI',
  async (showSuccessMessage = true) => {
    const response = await authorizeAxiosInstance.delete(`${API_ROOT}/v1/users/logout`)

    if (showSuccessMessage) {
      toast.success('Logged out successfully!')
    }

    return response.data
  }
)

export const updateUserAPI = createAsyncThunk(
  'user/updateUserAPI',
  async (data) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/users/update`, data);
    return response.data;
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAPI.fulfilled, (state, action) => {
        // action.payload là dữ liệu trả về từ API
        const user = action.payload;

        state.currentUser = user;
      })
      .addCase(logoutUserAPI.fulfilled, (state) => {
        /**
         * API logout sau khi gọi thành công thì sẽ clear thông tin currentUser về null ở đây
         * Kết hợp ProtectedRoute đã làm ở App.js => code sẽ điều hướng chuẩn về trang Login
         */
        state.currentUser = null
      })
      .addCase(loginUserAPI.rejected, (state, action) => {
        // Có thể dùng để set trạng thái lỗi
        console.error('Login failed:', action.payload);
      })
      .addCase(updateUserAPI.fulfilled, (state, action) => {
        const user = action.payload;
        state.currentUser = user;
      });
  }
})

// Selector: nơi dành cho các component bên dưới gọi bằng hook useSelector để lấy dữ liệu
// từ trong redux store ra xử dụng
export const selectCurrentUser = (state) => {
  return state.user.currentUser;
};

export default userSlice.reducer;