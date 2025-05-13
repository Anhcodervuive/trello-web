import axios from 'axios';
import { API_ROOT } from '~/utils/contants';

export const fetchBoardDetailsAPI = async (id) => {
  const res = await axios.get(`${API_ROOT}/v1/boards/${id}`);

  return res.data;
}