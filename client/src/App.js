import NavBar from './components/NavBar/NavBar'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import Register from './pages/Register/Register'
import Upload from './pages/Upload/Upload'
import Saved from './pages/Saved/Saved'
import Search from './pages/Search/Search'
import PostLarge from './components/PostLarge/PostLarge'
import { Routes, Route } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import { PostContext } from './context/PostContext'
import { useState, useContext } from 'react'

function App() {
  const { userObject } = useContext(AuthContext)
  const [postObject, setPostObject] = useState({userId: '', postId: '', isLiked: false})
  const postValue = {postObject, setPostObject}

  return (
    <PostContext.Provider value={postValue}>
      <NavBar />
      <PostLarge />
      <Routes>
        <Route path='/' element={userObject.user? <Home /> : <Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/:username' element={<Profile />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/saved' element={<Saved />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </PostContext.Provider>
  )
}

export default App;
