import './feed.css'
import Post from '../Post/Post'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'

export default function Feed({ type }) {
  const [posts, setPosts] = useState([])
  const { userObject } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    
    const getPosts = async () => { 

      const res = await axios.get(type === 'home'? `posts/feed/${userObject.user._id}` : `/posts/saved/${userObject.user.username}`)
      setPosts(
        res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }))
      setLoading(false)
    }

    getPosts()
  }, [type, userObject.user])


    return (
        <div className='feed'>
        {loading?
          <div className='testBlock'>
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          </div>
          :
          <div className='feedGrid'>
          {posts.map((p) => (
            <Post key={p._id} post={p} />
          ))}
          </div>
        }
        </div>
    )
}
