
// Cấu hình socket-io phía client tại đây và export ra biến socketIoInstance
// https://socket.io/how-to/use-with-react
import { io } from 'socket.io-client';
import { API_ROOT } from '~/utils/contants';

export const socketIoInstance = io(API_ROOT);