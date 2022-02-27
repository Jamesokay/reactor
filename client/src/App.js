import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import Register from './pages/Register/Register'
import { Routes, Route } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import { useState } from 'react'

function App() {
  const [userObject, setUserObject] = useState({ user: null, isFetching: false, error: false})
  const value = {userObject, setUserObject}
  
  return (
    <AuthContext.Provider value={value}>
      <Routes>
        <Route path='/' element={userObject.user? <Home /> : <Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile/:username' element={<Profile />} />
      </Routes>
    </AuthContext.Provider>
  )
}

export default App;
