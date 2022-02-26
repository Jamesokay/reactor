import './feed.css'
import Post from '../Post/Post'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Feed() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => { 
      const res = await axios.get("posts/feed/62179e025a8aa3cbe2b9090e")
      setPosts(res.data)
    }

    getPosts()
  }, [])


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
