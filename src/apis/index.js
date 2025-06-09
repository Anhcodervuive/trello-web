import axios from 'axios';
import { API_ROOT } from '~/utils/contants';

export const fetchBoardDetailsAPI = async (id) => {
  const res = await axios.get(`${API_ROOT}/v1/boards/${id}`);

  return res.data;
}

export const updateBoardDetailsAPI = async (id, data) => {
  const res = await axios.put(`${API_ROOT}/v1/boards/${id}`, data);

  return res.data;
}

export const moveCardTodifferentColumnAPI = async (data) => {
  const res = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, data);

  return res.data;
}

export const createNewColumnAPI = async (newColumnData) => {
  const res = await axios.post(`${API_ROOT}/v1/columns`, newColumnData);

  return res.data;
}

export const updateColumnDetailsAPI = async (id, data) => {
  const res = await axios.put(`${API_ROOT}/v1/columns/${id}`, data);

  return res.data;
}

export const deleteColumnDetailsAPI = async (id) => {
  const res = await axios.delete(`${API_ROOT}/v1/columns/${id}`);

  return res.data;
}

export const createNewCardAPI = async (newCardData) => {
  const res = await axios.post(`${API_ROOT}/v1/cards`, newCardData);

  return res.data;
}