import NavBar from './components/NavBar/NavBar'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import Register from './pages/Register/Register'
import Upload from './pages/Upload/Upload'
import Saved from './pages/Saved/Saved'
import Search from './pages/Search/Search'
import PostPage from './pages/PostPage/PostPage'
import PostLarge from './components/PostLarge/PostLarge'
import { Routes, Route } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import { PostContext } from './context/PostContext'
import { useContext, useEffect } from 'react'
import useViewPort from './hooks/useViewPort'
import { useNavigate } from 'react-router-dom'

function App() {
  const { userObject } = useContext(AuthContext)
  const { postObject, setPostObject } = useContext(PostContext)
  const { width } = useViewPort()
  const navigate = useNavigate()

  useEffect(() => {
    if (postObject.postId && width < 1000) {
      setPostObject({userId: '', postId: '', isLiked: false})
      navigate('/post')
    } 
  }, [postObject, width, navigate, setPostObject])

  return (
    <>
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
        <Route path='/post' element={<PostPage />} />
      </Routes>
    </>
  )
}

export default App;
