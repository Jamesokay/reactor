import NavBar from './components/NavBar/NavBar'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import Register from './pages/Register/Register'
import Upload from './pages/Upload/Upload'
import { Routes, Route } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import { useState } from 'react'

function App() {
  const [userObject, setUserObject] = useState({ user: null, isFetching: false, error: false})
  const value = {userObject, setUserObject}
  
  return (
    <AuthContext.Provider value={value}>
      {userObject.user && <NavBar />
      }
      <Routes>
        <Route path='/' element={userObject.user? <Home /> : <Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile/:username' element={<Profile />} />
        <Route path='/upload' element={<Upload />} />
      </Routes>
    </AuthContext.Provider>
  )
}

export default App;
