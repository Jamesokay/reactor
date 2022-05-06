import './post.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom"
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';
import { LoadContext } from '../../context/LoadContext'

export default function Post({ post }) {
  const { userObject } = useContext(AuthContext)
  const { loadCount, setLoadCount } = useContext(LoadContext)
  const [isLiked, setIsLiked] = useState(post.likes.includes(userObject.user._id))


  const handleLike = async () => {
    try {
      const res = await axios.put('https://reactorsocial.herokuapp.com/api/posts/' + post._id + '/like', { userId: userObject.user._id })
      const res2 = await axios.put('https://reactorsocial.herokuapp.com/api/users/' + userObject.user._id + '/save', { postId: post._id })
      console.log(res)
      console.log(res2)
    } catch (err) {
      console.error(err)
    }
    setIsLiked(!isLiked)
  }

    return (
        <div className='post'>
          <Link to={`/post/${post._id}`} className='postLink'>
            <img className='postImg' src={post.img} alt='' />
          </Link>
            <div className='postBottom'>
              <div className='postBottomLeft'>
                <img className='profileImg' src={post.userImg} alt='' onLoad={() => setLoadCount(loadCount + 1)}/>
                <Link to={`/${post.username}`} className='profileName'>{post.username}</Link>
              </div>
              <div className='postBottomRight'>
              {(isLiked)?
                  <FavoriteIcon onClick={() => handleLike()} style={{color: '#e30b5d', cursor: 'pointer'}}/>
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
