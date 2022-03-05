import './feed.css'
import Post from '../Post/Post'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

export default function Feed() {
  const [posts, setPosts] = useState([])
  const { userObject } = useContext(AuthContext)

  useEffect(() => {
    const getPosts = async () => { 
      const res = await axios.get(`posts/feed/${userObject.user._id}`)
      setPosts(
        res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }))
    }

    getPosts()
  }, [userObject.user._id])


    return (
        <div className='feed'>
          <div className='feedGrid'>
          {posts.map((p) => (
            <Post key={p._id} post={p} />
          ))}
          </div>
        </div>
    )
}
