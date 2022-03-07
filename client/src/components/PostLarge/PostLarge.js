import './postLarge.css'
import { useContext, useState, useEffect } from 'react'
import { PostContext } from '../../context/PostContext'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

export default function PostLarge() {
    const [post, setPost] = useState({})
    const [user, setUser] = useState({})
    const { userObject } = useContext(AuthContext)
    const { postObject, setPostObject } = useContext(PostContext)
    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        const getUser = async () => { 
        const res = await axios.get(`users?userId=${postObject.userId}`)
          setUser(res.data)
        }      
        getUser()
    }, [postObject.userId])

    useEffect(() => {
        if (!userObject.user) return
        if (!postObject.postId) return
        const getPost = async () => { 
          const res = await axios.get(`posts/${postObject.postId}`)
          setPost(res.data)
          setIsLiked(res.data.likes.includes(userObject.user._id))
        }
        getPost()
    }, [postObject.postId, userObject.user])


    const handleLike = async () => {
        try {
          const res = await axios.put('/posts/' + postObject.postId + '/like', { userId: userObject.user._id })
          console.log(res)
        } catch (err) {
          console.error(err)
        }
        setIsLiked(!isLiked)
    }
    
    const clearPost = () => {
        setPost({})
        setPostObject({userId: '', postId: ''})
    }

    return (
        <div className='postLargeContainer' style={post.img? {display: 'flex'} : {}}>
            <img className='postLargeImage' src={post.img} alt='' />
            <div className='postLargeSideBar'>
              <div className='postSideBarTop'>
                <div className='postSideBarTopLeft'>
                  <img className='postSideBarProfileImage' src={user.profilePicture} alt='' />
                  <Link 
                    to={`/profile/${user.username}`} 
                    className='postSideBarProfileName'
                    onClick={() => clearPost()}   
                    >{user.username}</Link>
                </div>
                <CloseIcon className='closeIcon' onClick={() => clearPost()}/>
              </div>

              <div className='postSideBarMiddle'>
                {(isLiked)?
                <FavoriteIcon className='postSideBarIcon' onClick={() => handleLike()} style={{color: 'red'}} />
                :
                <FavoriteBorderIcon className='postSideBarIcon' onClick={() => handleLike()} />
                }
                <ChatBubbleOutlineOutlinedIcon className='postSideBarIcon' />
              </div>
            </div>
        </div>
    )
}
