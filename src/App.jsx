import * as React from 'react';

import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import Board from './pages/Boards/_id.jsx';
import NotFound from './pages/404/NotFound.jsx';
import Auth from './pages/Auth/Auth.jsx';
import AccountVerification from './pages/Auth/AccountVerification.jsx';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './redux/user/userSlice.js';

const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true} />
  return <Outlet />
}


function App() {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/board/6820b9391b72625d8dce2a5b' replace />} />
      {/* Chuyển hướng về board mặc định nếu không có boardId */}
      <Route element={<ProtectedRoute user={currentUser} />}>

        <Route path='/board/:boardId' element={<Board />}/>
      </Route>

      {/* Authentication */}
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />
      <Route path='/account/verification' element={<AccountVerification />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
