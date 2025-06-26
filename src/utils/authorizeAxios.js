import axios from 'axios';
import { toast } from 'react-toastify';
import { interceptorLoadingElements } from './formatters';
import { logoutUserAPI } from '~/redux/user/userSlice';
import { refreshTokenAPI } from '~/apis';

/**
 * Không thể `import { store } from '~/redux/store'` theo cách thông thường ở đây
 * Giải pháp: Inject store: là kỹ thuật khi cần sử dụng biến redux store ở các file ngoài phạm vi component
   như file authorizeAxios hiện tại
 * Hiểu đơn giản: khi ứng dụng bắt đầu chạy lên, code sẽ chạy vào main.jsx đầu tiên, từ bên đó chúng ta gọi
   hàm injectStore ngay lập tức để gán biến mainStore vào biến axiosReduxStore cục bộ trong file này.
 * https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files
 */

let axiosReduxStore

export const injectStore = _store => {
  axiosReduxStore = _store
}


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

// Khởi tạo một cái promise cho việc gọi api refresh_token
// Mục đích tạo Promise này để khi nào gọi api refresh_token xong xuôi thì mới retry lại nhiều api bị lỗi trước đó.
// https://www.thedutchlab.com/en/insights/using-axios-interceptors-for-refreshing-your-api-token

let refreshTokenPromise = null


// Add a response interceptor
authorizeAxiosInstance.interceptors.response.use(function (response) {
  // Kỹ thuật chặn spam click (Xem kỹ mô tả file fommatter chứa function)
  interceptorLoadingElements(false)
  return response;
}, function (error) {
  // Mọi mã http status code nằm ngoài khoảng 200 - 299 sẽ là error rơi vào đây
  // Kỹ thuật chặn spam click (Xem kỹ mô tả file fommatter chứa function)

  interceptorLoadingElements(false)

  /* ⚠️ Quan trọng: Xử lý Refresh Token tự động */

  // Trường hợp 1: Nếu như nhận mã 401 từ BE, thì gọi api đăng xuất luôn
  if (error?.response?.status === 401) {
    axiosReduxStore.dispatch(logoutUserAPI(false))
  }
  // Trường hợp 2: Nếu như nhận mã 410 từ BE, thì sẽ gọi api refresh token để làm mới lại accessToken
  // Đầu tiên lấy được các request API đang bị lỗi thông qua error.config
  const originalRequests = error.config
  if (error?.response?.status === 410 && !originalRequests._retry) {
    // Gán thêm một giá trị _retry luôn = true trong khoảng thời gian chờ, đảm bảo việc refresh token này
    // chỉ luôn gọi 1 lần tại 1 thời điểm (nhìn lại điều kiện if ngay phía trên)

    originalRequests._retry = true
    // Kiểm tra xem nếu chưa có refreshTokenPromise thì thực hiện gán việc gọi api refresh_token đồng thời
    // gán vào cho biến refreshTokenPromise
    if (!refreshTokenPromise) {
      refreshTokenPromise = refreshTokenAPI()
        .then(data => {
          // Đồng thời accessToken đã nằm trong httpOnly (Xử lý từ phía BE)
          return data?.accessToken
        })
        .catch((_error) => {
          // Nếu nhận bất cứ lỗi nào từ api refreshToken thì cứ logout luôn
          axiosReduxStore.dispatch(logoutUserAPI(false))
          return Promise.reject(_error)
        })
        .finally(() => {
          // Dù có lỗi hay không thì vẫn phải set refreshTokenPromis = null
          refreshTokenPromise = null
        })
    }

    // Cần return trường hợp refreshTokenPromise chạy thành công và xử lý thêm ở đây:
    // eslint-disable-next-line no-unused-vars
    return refreshTokenPromise.then((accessToken) => {
      /**
   * Bước 1: Đối với Trường hợp nếu dự án cần lưu accessToken vào localstorage hoặc đâu đó thì sẽ viết thêm code xử lý ở đây.
   * Hiện tại ở đây không cần bước 1 này vì chúng ta đã đưa accessToken vào cookie (xử lý từ phía BE)
     sau khi api refreshToken được gọi thành công.
   */

      // Bước 2: Bước Quan trọng: Return lại axios instance của chúng ta kết hợp các originalRequests để
      // gọi lại những api ban đầu bị lỗi
      return authorizeAxiosInstance(originalRequests)
    })

  }

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