import Feed from '../..//components/Feed/Feed'
import './Home.css'
import { useContext, useState, useEffect } from 'react'
import { PostContext } from '../../context/PostContext'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'


export default function Home() {
  const { postObject } = useContext(PostContext)
  const [posts, setPosts] = useState([])
  const { userObject } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [following, setFollowing] = useState([])

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

    // get userObject.user.following by ID... possibly update API endpoint to go off of ID rather than name

    useEffect(() => {
      if (!userObject.user.following) return
      const getFollowing = async (userId) => { 
        const res = await axios.get(`users?userId=${userId}`)
        setFollowing(following => [...following, res.data])
      }
      userObject.user.following.forEach((f) => getFollowing(f))

      return () => {
        setFollowing([])
      }
    }, [userObject])

    return (
        <>
        {loading?
          <div className='loadContainer'>
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
          </div>
          :
          <div className='homeContainer' style={postObject.postId? {opacity: '0.5'} : {opacity: '1'}}>
            {following && (
              <div className='followingContainer'>
                {following.map((f) => (
                  <div key={f._id} className='followingUser'>
                    <img className='followingImg' src={f.profilePicture} alt='' />
                    <span>{f.username}</span>
                  </div>
                ))
                }
              </div>
            )}
              <Feed content={posts} />
          </div>
        }
        </>
    )
}
