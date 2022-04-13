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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function PostLarge() {
    const [post, setPost] = useState({})
    const [user, setUser] = useState({})
    const { userObject } = useContext(AuthContext)
    const { postObject, setPostObject } = useContext(PostContext)
    const [caption, setCaption] = useState([])
    const [isLiked, setIsLiked] = useState(false)
    const [commenting, setCommenting] = useState(false)
    const [newComment, setNewComment] = useState('')
    const [showOptions, setShowOptions] = useState(false)
    const [comments, setComments] = useState([])

    useEffect(() => {
      if (!postObject.userId) return
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
          if (res.data.desc) {
            setCaption(res.data.desc.split(' '))
          }
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
    
    const clearPost = () => {
        setPost({})
        setCaption([])
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

    return postObject.postId? (
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
                <div className='postSideBarIcon'>
                  <CloseIcon className='closeIcon' onClick={() => clearPost()}/>
                </div>
              </div>

              <div className='postSideBarMiddle'>
                <div className='postCaption'>
                  {caption &&
                    caption.map((word) => (
                      word.startsWith('#')?
                        <span className='tagLink'>{word}</span>
                      :
                        <span className='captionText'>{word}</span>
                    ))}
                </div>
                <div className='postIconContainer'>
                {(isLiked)?
                  <FavoriteIcon onClick={() => handleLike()} style={{color:'#e30b5d'}} />
                :
                <div className='postSideBarIcon'>
                  <FavoriteBorderIcon onClick={() => handleLike()} />
                </div>
                }
                <div className='postSideBarIcon'>
                  <ChatBubbleOutlineOutlinedIcon onClick={() => setCommenting(!commenting)}/>
                </div>
                {(userObject.user._id === postObject.userId) && (
                  <div className='postSideBarIcon'>
                    <MoreVertIcon onClick={() => setShowOptions(!showOptions)}/>
                  </div>
                )}
                {showOptions && (
                  <div className='postOptionsContainer'>
                    <ul className='postOptionsMenu'>
                      <li className='postOption'>
                        <EditOutlinedIcon className='postOptionIcon' />
                        <span>Edit post</span>
                      </li>
                      <li className='postOption'>
                        <DeleteForeverIcon className='postOptionIcon' />
                        <span>Delete post</span>
                      </li>
                    </ul>
                  </div>
                )}      
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
    :
    (
    <></>
    )
}
