import './postLarge.css'
import { useContext, useState, useEffect } from 'react'
import { PostContext } from '../../context/PostContext'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import Comment from '../Comment/Comment'
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
    const [commenting, setCommenting] = useState(false)
    const [newComment, setNewComment] = useState('')
    const [comments, setComments] = useState([])

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
          const res = await axios.get(`posts/post/${postObject.postId}`)
          console.log(res.data)
          setPost(res.data)
          setComments(res.data.comments)
          setIsLiked(res.data.likes.includes(userObject.user._id))
        }
        
        getPost()
    }, [postObject.postId, userObject.user])

    useEffect(() => {
      setNewComment('')
    }, [commenting])

    const handleLike = async () => {
        try {
          const res = await axios.put('/posts/' + postObject.postId + '/like', { userId: userObject.user._id })
          const res2 = await axios.put('/users/' + userObject.user._id + '/save', { postId: post._id })
          console.log(res)
          console.log(res2)
        } catch (err) {
          console.error(err)
        }
        setIsLiked(!isLiked)
        setPostObject({...postObject, isLiked: !postObject.isLiked})
    }
    
    const clearPost = () => {
        setPost({})
        setPostObject({userId: '', postId: '', isLiked: isLiked})
    }

    const testCommentRoute = async ( comment ) => {
      setComments(comments => [{ username: userObject.user.username, profileImg: userObject.user.profilePicture, commentText: comment}, ...comments])
      try {
        await axios.put('/posts/' + postObject.postId + '/comment', 
        { username: userObject.user.username, profileImg: userObject.user.profilePicture, commentText: comment})
      } catch (err) {
        console.error(err)
      }
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
                <div className='postCaption'> 
                  <span>{post.desc}</span>
                </div>
                <div className='postIconContainer'>
                {(isLiked)?
                <FavoriteIcon className='postSideBarIcon' onClick={() => handleLike()} style={{color:'#e30b5d'}} />
                :
                <FavoriteBorderIcon className='postSideBarIcon' onClick={() => handleLike()} />
                }
                <ChatBubbleOutlineOutlinedIcon className='postSideBarIcon' onClick={() => setCommenting(!commenting)}/>
                </div>
              </div>
              <div className='commentsContainer'>
              <div className='newCommentContainer' style={commenting? {display: 'flex'} : {display: 'none'}}>
                <textarea 
                  id='newComment' 
                  placeholder='Write a comment'
                  value={newComment}
                  onChange={e => {
                    setNewComment(e.target.value)
                  }}              
                ></textarea>
                <div className='newCommentButton' onClick={() => {
                  testCommentRoute(newComment)
                  setCommenting(false)   
                }}>Post</div>
                </div>
              {comments?
                <div className='comments'>
                  {comments.map((c) => (
                    <Comment key={c.id} comment={c} />
                  ))}
                </div>
              :
                <div className='comments' />
              }

              </div>
            </div>
        </div>
    )
}
