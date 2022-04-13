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
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [updatedCaption, setUpdatedCaption] = useState('')

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

    useEffect(() => {
      if (isEditing || isDeleting) {
        setShowOptions(false)
      }
    }, [isEditing, isDeleting])

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

    const handleEdit = async (e) => {
      e.preventDefault()
      try {
        await axios.put(`/posts/${post._id}`, {userId: userObject.user._id, desc: updatedCaption})
        setCaption(updatedCaption.split(' '))
        setUpdatedCaption('')
        setIsEditing(false)
      } catch (err) {
        console.error(err)
      }
    }

    const deletePost = async (e) => {
      e.preventDefault()
      console.log('deleting post')
      setIsDeleting(false)
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
        setIsEditing(false)
        setUpdatedCaption('')
        setShowOptions(false)
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
          {isDeleting && (
            <div className='confirmDelete'>
              <span className='confirmDeleteMessage'>Are you sure you wish to delete this post?</span>
              <div className='editPostOptions'>  
                <div className='submitEdit' onClick={deletePost}>Confirm</div>
                <div className='submitEdit' onClick={() => setIsDeleting(false)}>Cancel</div>
              </div>
            </div>
          )}         
            <img className='postLargeImage' src={post.img} alt='' />
            <div className='postLargeSideBar'>
              <div className='postSideBarTop'>
                <div className='postSideBarTopLeft'>
                  <img className='postSideBarProfileImage' src={user.profilePicture} alt='' />
                  <Link 
                    to={`/${user.username}`}  
                    className='postSideBarProfileName'
                    onClick={() => clearPost()}   
                    >{user.username}</Link>
                </div>
                <div className='postSideBarIcon'>
                  <CloseIcon className='closeIcon' onClick={() => clearPost()}/>
                </div>
              </div>

              <div className='postSideBarMiddle'>
              {!isEditing?
                <div className='postCaption'>
                  {caption &&
                    caption.map((word) => (
                      word.startsWith('#')?
                        <span className='tagLink'>{word}</span>
                      :
                        <span className='captionText'>{word}</span>
                    ))}
                </div>
                :
                <div className='editPostContainer'>
                  <textarea
                       className='editPost'
                       value={updatedCaption}
                       type='text'
                       onChange={e => {
                       setUpdatedCaption(e.target.value)
                  }} ></textarea>  
                  <div className='editPostOptions'>  
                    <div className='submitEdit' onClick={handleEdit}>Update</div>
                    <div className='submitEdit' onClick={() => setIsEditing(false)}>Cancel</div>
                  </div>
                </div>
              }
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
                      <li className='postOption' onClick={() => setIsEditing(true)}>
                        <EditOutlinedIcon className='postOptionIcon' />
                        <span>Edit post</span>
                      </li>
                      <li className='postOption' onClick={() => setIsDeleting(true)}>
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
