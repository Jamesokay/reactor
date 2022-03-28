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
import { useState } from 'react'

function App() {
  const [userObject, setUserObject] = useState({ user: null, isFetching: false, error: false})
  const userValue = {userObject, setUserObject}
  const [postObject, setPostObject] = useState({userId: '', postId: '', isLiked: false})
  const postValue = {postObject, setPostObject}
  
  return (
    <AuthContext.Provider value={userValue}>
    <PostContext.Provider value={postValue}>
      {userObject.user && <NavBar />
      }
      <PostLarge />
      <Routes>
        <Route path='/' element={userObject.user? <Home /> : <Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile/:username' element={<Profile />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/saved' element={<Saved />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </PostContext.Provider>
    </AuthContext.Provider>
  )
}

export default App;
