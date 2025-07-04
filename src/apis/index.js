import { toast } from 'react-toastify';
import authorizeAxiosInstance from '../utils/authorizeAxios';
import { API_ROOT } from '~/utils/contants';

export const updateBoardDetailsAPI = async (id, data) => {
  const res = await authorizeAxiosInstance.put(`${API_ROOT}/v1/boards/${id}`, data);

  return res.data;
}

export const moveCardTodifferentColumnAPI = async (data) => {
  const res = await authorizeAxiosInstance.put(`${API_ROOT}/v1/boards/supports/moving_card`, data);

  return res.data;
}

export const createNewColumnAPI = async (newColumnData) => {
  const res = await authorizeAxiosInstance.post(`${API_ROOT}/v1/columns`, newColumnData);

  return res.data;
}

export const updateColumnDetailsAPI = async (id, data) => {
  const res = await authorizeAxiosInstance.put(`${API_ROOT}/v1/columns/${id}`, data);

  return res.data;
}

export const deleteColumnDetailsAPI = async (id) => {
  const res = await authorizeAxiosInstance.delete(`${API_ROOT}/v1/columns/${id}`);

  return res.data;
}

export const createNewCardAPI = async (newCardData) => {
  const res = await authorizeAxiosInstance.post(`${API_ROOT}/v1/cards`, newCardData);

  return res.data;
}

/** Users */
export const registerUserAPI = async (data) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/users/register`, data)
  toast.success('Account created successfully! Please check and verify your account before logging in!',
    { theme: 'colored' })
  return response.data
}

export const verifyUserAPI = async (data) => {
  const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/users/verify`, data)
  toast.success('Account verified successfully! Now you can login to enjoy our services! Have a good day!',
    { theme: 'colored' })
  return response.data
}

export const refreshTokenAPI = async () => {
  const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/users/refresh_token`)
  return response.data
}

export const fetchBoardsAPI = async (searchPath) => {
  const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/boards${searchPath}`);
  return response.data;
};

export const createNewBoardAPI = async (data) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/boards`, data)
  toast.success('Board created successfully')
  return response.data
}

export const updateCardDetailsAPI = async (cardId, updateData) => {
  const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/cards/${cardId}`, updateData)
  return response.data
}

export const inviteUserToBoardAPI = async (data) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/invitations/board`, data)
  toast.success('User invited to board successfully!')
  return response.data
}
