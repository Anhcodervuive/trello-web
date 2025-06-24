import axios from 'axios';
import { toast } from 'react-toastify';
import { interceptorLoadingElements } from './formatters';

// Khởi tạo 1 axios instance mục đích custom và cấu hình chung cho dự án
let authorizeAxiosInstance = axios.create()
// Thời gian chờ tối đa của 1 request: 10 phút
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10
// withCredentials: sẽ cho phép axios tự động gửi cookie trong mỗi request lên BE (Phục vụ
// việc chúng ta sẽ lưu JWT tokens (refresh & token) vào trong httpOnly Cookie của trình duyệt)
authorizeAxiosInstance.defaults.withCredentials = true

// Cấu hình bộ đánh chặn giữa request và response

// Add a request interceptor
authorizeAxiosInstance.interceptors.request.use(function (config) {
  // Kỹ thuật chặn spam click (Xem kỹ mô tả file fommatter chứa function)
  interceptorLoadingElements(true)
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
authorizeAxiosInstance.interceptors.response.use(function (response) {
  // Kỹ thuật chặn spam click (Xem kỹ mô tả file fommatter chứa function)
  interceptorLoadingElements(false)
  return response;
}, function (error) {
  // Mọi mã http status code nằm ngoài khoảng 200 - 299 sẽ là error rơi vào đây
  // Kỹ thuật chặn spam click (Xem kỹ mô tả file fommatter chứa function)
  interceptorLoadingElements(false)
  // Xử lý tập trung phần hiển thị thông báo lỗi trả về từ API ở đây (Viết code 1 lần)
  let errorMessage = error?.message
  if (error?.response?.data?.message) {
    errorMessage = error.response.data?.message
  }
  // Dùng react toastify để hiển thị bất kỳ lỗi gì lên màn hình - Ngoại trừ mã 410 - GONE phục vụ lại việc tự động refresh lại token
  if (error?.response?.status !== 410) {
    console.log(error);
    toast.error(errorMessage)
  }
  return Promise.reject(errorMessage);
});

export default authorizeAxiosInstance