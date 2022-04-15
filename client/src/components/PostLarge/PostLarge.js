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
//import useViewPort from '../../hooks/useViewPort'

export default function PostLarge() {
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
//    const { width } = useViewPort()

    useEffect(() => {
      if (!postObject.post) return
        const getUser = async () => { 
        const res = await axios.get(`users?userId=${postObject.post.userId}`)
          setUser(res.data)
        }      
        setCaption(postObject.post.desc.split(' '))
        setIsLiked(postObject.post.likes.includes(userObject.user._id))
        setComments(postObject.post.comments)

        getUser()
    }, [postObject.post, userObject.user._id])

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
          const res = await axios.put('/posts/' + postObject.post._id + '/like', { userId: userObject.user._id })
          const res2 = await axios.put('/users/' + userObject.user._id + '/save', { postId: postObject.post._id })
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
        await axios.put(`/posts/${postObject.post._id }`, {userId: userObject.user._id, desc: updatedCaption})
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
      const myURLObj = new URL(postObject.post.img)
      const parts = myURLObj.pathname.split('/')
      const parts2 = parts[parts.length - 1].split('.')
  
      const finalObject = {
        userId: postObject.post.userId,
        postId: postObject.post._id.split('"')[0],
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
        setCaption([])
        setIsEditing(false)
        setUpdatedCaption('')
        setShowOptions(false)
        setPostObject({post: null, isLiked: isLiked})
    }

    const testCommentRoute = async ( comment ) => {
      setComments(comments => [{ username: userObject.user.username, profileImg: userObject.user.profilePicture, commentText: comment}, ...comments])
      try {
        await axios.put('/posts/' + postObject.post._id + '/comment', 
        { username: userObject.user.username, profileImg: userObject.user.profilePicture, commentText: comment})
      } catch (err) {
        console.error(err)
      }
    }

    return postObject.post? (
        <div className='postLargeContainer' style={postObject.post.img? {display: 'flex'} : {}}>
          {isDeleting && (
            <div className='confirmDelete'>
              <span className='confirmDeleteMessage'>Are you sure you wish to delete this post?</span>
              <div className='editPostOptions'>  
                <div className='submitEdit' onClick={deletePost}>Confirm</div>
                <div className='submitEdit' onClick={() => setIsDeleting(false)}>Cancel</div>
              </div>
            </div>
          )}         
            <img className='postLargeImage' src={postObject.post.img} alt='' />
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
                {(userObject.user._id === postObject.post.userId) && (
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
