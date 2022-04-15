import NavBar from './components/NavBar/NavBar'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import Register from './pages/Register/Register'
import Upload from './pages/Upload/Upload'
import Saved from './pages/Saved/Saved'
import Search from './pages/Search/Search'
import { Routes, Route } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import { useContext } from 'react'

function App() {
  const { userObject } = useContext(AuthContext)

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={userObject.user? <Home /> : <Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/:username' element={<Profile />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/saved' element={<Saved />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </>
  )
}

export default App;
