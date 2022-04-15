import Feed from '../../components/Feed/Feed'
import './Home.css'
import { useContext, useState, useEffect } from 'react'
import { PostContext } from '../../context/PostContext'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'
import PostLarge from '../../components/PostLarge/PostLarge'


export default function Home() {
  const { postObject } = useContext(PostContext)
  const [posts, setPosts] = useState([])
  const { userObject } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
//  const [following, setFollowing] = useState([])

  useEffect(() => {  
    const getPosts = async () => { 
      try {
        const res = await axios.get(`posts/feed/${userObject.user._id}`)
        setPosts(
          res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt)
        }))
        setLoading(false)
      } catch(err) {
        console.error(err)
      }
    }
    getPosts()
  }, [userObject.user]) 

    return (
        <>
        <PostLarge />
        {loading?
          <div className='loadContainer'>
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
          </div>
          :
          <div className='homeContainer' style={postObject.post? {opacity: '0.5', overflowY: 'hidden'} : {opacity: '1'}}>
            <Feed content={posts} />
          </div>
        }
        </>
    )
}
