import * as React from 'react';

import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import Board from './pages/Boards/_id.jsx';
import NotFound from './pages/404/NotFound.jsx';
import Auth from './pages/Auth/Auth.jsx';
import AccountVerification from './pages/Auth/AccountVerification.jsx';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './redux/user/userSlice.js';
import Settings from './pages/Settings/Settings.jsx';
import Boards from './pages/Boards/index.jsx';

const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true} />
  return <Outlet />
}


function App() {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/boards' replace />} />
      {/* Chuyển hướng về board mặc định nếu không có boardId */}
      <Route element={<ProtectedRoute user={currentUser} />}>

        <Route path='/board/:boardId' element={<Board />}/>
        <Route path='/boards' element={<Boards />} />

        <Route path='/settings/account' element={<Settings />} />
        <Route path='/settings/security' element={<Settings />} />
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
