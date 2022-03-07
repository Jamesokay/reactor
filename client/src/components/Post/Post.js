import './post.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from "react-router-dom"
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { PostContext } from '../../context/PostContext';

export default function Post({ post }) {
  const [user, setUser] = useState({})
  const { setPostObject } = useContext(PostContext)

  useEffect(() => {
    
    const getUser = async () => { 
      const res = await axios.get(`users?userId=${post.userId}`)
      setUser(res.data)
    }

    getUser()
  }, [post.userId])

  const deletePost = async (e) => {
    e.preventDefault()
    console.log('deleting post')
    const myURLObj = new URL(post.img)
    const parts = myURLObj.pathname.split('/')
    const parts2 = parts[parts.length - 1].split('.')

    const finalObject = {
      userId: post.userId,
      postId: post._id.split('"')[0],
      cloudinaryId: parts2[0]
    }
    
    try {
      const res = await axios.delete('/posts/delete', { data: finalObject })
      console.log('post deleted')
      console.log(res.data)
    } catch(err) {
      console.error(err)
    } 

  }

  const enlargePost = () => {
    console.log('enlarging')
    setPostObject(post)
  }





    return (
        <div className='post'>
            <img className='postImg' src={post.img} alt='' onClick={() => enlargePost()}/>
            <div className='postBottom'>
              <div className='postBottomLeft'>
                <img className='profileImg' 
                     src={user.profilePicture}
                     alt=''
                />
                <Link to={`/profile/${user.username}`} className='profileName'>{user.username}</Link>
              </div>
              <div className='postBottomRight'>
                <div className='postIcon'>
                  <FavoriteBorderIcon />
                </div>
                <div className='postIcon'>
                  <MoreVertIcon onClick={(e) => deletePost(e)}/>
                </div>

              </div>
            </div>    
        </div>
    )
}
