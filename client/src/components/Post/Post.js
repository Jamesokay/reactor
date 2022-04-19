import './post.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom"
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';

export default function Post({ post }) {
  const [user, setUser] = useState({})
  const { userObject } = useContext(AuthContext)
  const [isLiked, setIsLiked] = useState(post.likes.includes(userObject.user._id))
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    
    const getUser = async () => { 
      const res = await axios.get(`users?userId=${post.userId}`)
      setUser(res.data)
    }

    getUser()
  }, [post.userId])

  const handleLike = async () => {
    try {
      const res = await axios.put('/posts/' + post._id + '/like', { userId: userObject.user._id })
      const res2 = await axios.put('/users/' + userObject.user._id + '/save', { postId: post._id })
      console.log(res)
      console.log(res2)
    } catch (err) {
      console.error(err)
    }
    setIsLiked(!isLiked)
  }

    return (
        <div className='post' style={imgLoaded? {visibility: 'visible'} : {visibility: 'hidden'}}>
          <Link to={`/post/${post._id}`} className='postLink'>
            <img className='postImg' src={post.img} alt='' onLoad={() => setImgLoaded(true)} />
          </Link>
            <div className='postBottom'>
              <div className='postBottomLeft'>
                <img className='profileImg' src={user.profilePicture} alt=''/>
                <Link to={`/${user.username}`} className='profileName'>{user.username}</Link>
              </div>
              <div className='postBottomRight'>
              {(isLiked)?
                  <FavoriteIcon onClick={() => handleLike()} style={{color: '#e30b5d'}}/>
                :
                <div className='postIcon'>
                  <FavoriteBorderIcon onClick={() => handleLike()}/>
                </div>
              }

              </div>
            </div>    
        </div>
    )
}
