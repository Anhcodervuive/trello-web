import * as React from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import Board from './pages/Boards/_id.jsx';
import NotFound from './pages/404/NotFound.jsx';
import Auth from './pages/Auth/Auth.jsx';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/board/6820b9391b72625d8dce2a5b' replace />} />
      {/* Chuyển hướng về board mặc định nếu không có boardId */}
      <Route path='/board/:boardId' element={<Board />}/>

      {/* Authentication */}
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
