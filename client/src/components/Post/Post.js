import './post.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Post({ post }) {
  const [user, setUser] = useState({})

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





    return (
        <div className='post'>
          <div className='postWrapper'>
            <div className='postTop'>
              <div className='postTopLeft'>
                <img className='profileImg' 
                     src={user.profilePicture}
                     alt=''
                />
                <Link to={`/profile/${user.username}`} className='profileName'>{user.username}</Link>
              </div>
              <div className='postIconRight'>
                <MoreVertIcon onClick={(e) => deletePost(e)}/>
              </div>
            </div>
            <img className='postImg' src={post.img} alt='' />
            <div className='postCaption'>
              <span>{post.desc}</span>
            </div>
            <div className='postBottom'>
              <div className='postBottomLeft'>
                <div className='postIcon'>
                  <FavoriteBorderIcon />
                </div>
                <div className='postIcon'>
                  <ChatBubbleOutlineIcon />
                </div>
                <div className='postIcon'>
                  <ShareIcon />
                </div>
              </div>
              <div className='postIconRight'>
                <BookmarkBorderIcon />
              </div>
            </div>    
          </div>      
        </div>
    )
}
