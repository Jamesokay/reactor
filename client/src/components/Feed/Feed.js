import './feed.css'
import Post from '../Post/Post'
import Upload from '../Upload/Upload'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

export default function Feed() {
  const [posts, setPosts] = useState([])
  const { userObject } = useContext(AuthContext)

  useEffect(() => {
    const getPosts = async () => { 
      const res = await axios.get(`posts/feed/${userObject.user._id}`)
      setPosts(res.data)
    }

    getPosts()
  }, [userObject.user._id])


    return (
        <div className='feed'>
          <div className='feedWrapper'>
          <Upload />
          {posts.map((p) => (
            <Post key={p._id} post={p} />
          ))}
          </div>
        </div>
    )
}
