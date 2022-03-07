import './post.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from "react-router-dom"
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { PostContext } from '../../context/PostContext';
import { AuthContext } from '../../context/AuthContext';

export default function Post({ post }) {
  const [user, setUser] = useState({})
  const { userObject } = useContext(AuthContext)
  const { setPostObject } = useContext(PostContext)
  const [isLiked, setIsLiked] = useState(post.likes.includes(userObject.user._id))

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
    setPostObject({userId: post.userId, postId: post._id})
  }

  const handleLike = async () => {
    try {
      const res = await axios.put('/posts/' + post._id + '/like', { userId: userObject.user._id })
      console.log(res)
    } catch (err) {
      console.error(err)
    }
    setIsLiked(!isLiked)
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
              {(isLiked)?
                  <FavoriteIcon onClick={() => handleLike()} style={{color: 'red'}}/>
                :
                <div className='postIcon'>
                  <FavoriteBorderIcon onClick={() => handleLike()}/>
                </div>
              }
                <div className='postIcon'>
                  <MoreVertIcon onClick={(e) => deletePost(e)}/>
                </div>

              </div>
            </div>    
        </div>
    )
}
