import './feed.css'
import Post from '../Post/Post'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

export default function Feed() {
  const [posts, setPosts] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const getPosts = async () => { 
      const res = await axios.get(`posts/feed/${user._id}`)
      setPosts(res.data)
    }

    getPosts()
  }, [user._id])


    return (
        <div className='feed'>
          <div className='feedWrapper'>
          {posts.map((p) => (
            <Post key={p._id} post={p} />
          ))}
          </div>
        </div>
    )
}
