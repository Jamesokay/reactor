import './postPage.css'
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link, useParams } from 'react-router-dom'
import Comment from '../../components/Comment/Comment'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'

export default function PostPage() {
    const [user, setUser] = useState({})
    const { userObject } = useContext(AuthContext)
    const [post, setPost] = useState({})
    const [caption, setCaption] = useState([])
    const [isLiked, setIsLiked] = useState(false)
    const [commenting, setCommenting] = useState(false)
    const [newComment, setNewComment] = useState('')
    const [showOptions, setShowOptions] = useState(false)
    const [comments, setComments] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [updatedCaption, setUpdatedCaption] = useState('')
    const [postTime, setPostTime] = useState('')
    const postId = useParams()

    function relativeDays(timestamp) {
        const rtf = new Intl.RelativeTimeFormat('en', {
          numeric: 'auto',
        })
        const oneDayInMs = 1000 * 60 * 60 * 24;
        const daysDifference = Math.round(
          (timestamp - new Date().getTime()) / oneDayInMs,
        )    
        return rtf.format(daysDifference, 'day');
    }

    useEffect(() => {
      if (!postId.id) return
        const getPost = async () => {
          const res = await axios.get(`/posts/post/${postId.id}`)
          console.log(res.data)
          setPost(res.data)
          if (res.data.desc) {
            setCaption(res.data.desc.split(' '))
          }
          let timeStamp = res.data.createdAt.slice(0, 10)
          setPostTime(relativeDays(new Date(timeStamp).getTime()))
          setIsLiked(res.data.likes.includes(userObject.user._id))
          setComments(res.data.comments)
        }
        getPost()
    }, [postId.id, userObject.user._id])

    useEffect(() => {
      if (!post.userId) return
        const getUser = async () => { 
        const res = await axios.get(`/users?userId=${post.userId}`)
          setUser(res.data)
        }
        getUser()
    }, [post.userId])

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
          const res = await axios.put('/posts/' + post._id + '/like', { userId: userObject.user._id })
          const res2 = await axios.put('/users/' + userObject.user._id + '/save', { postId: post._id })
          console.log(res)
          console.log(res2)
        } catch (err) {
          console.error(err)
        }
        setIsLiked(!isLiked)
    }

    const handleEdit = async (e) => {
      e.preventDefault()
      try {
        await axios.put(`/posts/${post._id }`, {userId: userObject.user._id, desc: updatedCaption})
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

    const postComment = async ( comment ) => {
      setComments(comments => [{ id: comments.length, username: userObject.user.username, commentText: comment}, ...comments])
      try {
        await axios.put('/posts/' + post._id + '/comment', 
        { username: userObject.user.username, profileImg: userObject.user.profilePicture, commentText: comment})
      } catch (err) {
        console.error(err)
      }
    }
    return post? (
      <div className='postPageContainer'>
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
                <Link to={`/${user.username}`} className='postSideBarProfileName'>{user.username}</Link>
              </div>
              <div className='postIconContainer'>
                {(userObject.user._id === post.userId) && (
                  <MoreHorizIcon className='postSideBarIcon' onClick={() => setShowOptions(!showOptions)}/>
                )}
                {showOptions && (
                  <div className='postOptionsContainer'>
                    <ul className='postOptionsMenu'>
                      <li className='postOption topOption' onClick={() => setIsEditing(true)}>
                        <EditOutlinedIcon className='postOptionIcon' />
                        <span>Edit post</span>
                      </li>
                      <li className='postOption bottomOption' onClick={() => setIsDeleting(true)}>
                        <CloseIcon className='postOptionIcon' />
                        <span>Delete post</span>
                      </li>
                    </ul>
                  </div>
                )}      
              </div>
            </div>
            <div className='postSideBarActions'>
              <div className='postSideBarActionsLeft'>
                {(isLiked)?
                  <FavoriteIcon className='postSideBarIcon' onClick={() => handleLike()} style={{color:'#e30b5d'}} />
                :
                  <FavoriteBorderIcon className='postSideBarIcon' onClick={() => handleLike()} />
                }
                <ChatBubbleOutlineOutlinedIcon className='postSideBarIcon' onClick={() => setCommenting(!commenting)}/>
                <ShareOutlinedIcon className='postSideBarIcon' />
              </div>
              <BookmarkBorderIcon className='postSideBarIcon' />
            </div>
            <div className='postSideBarMiddle'>
              {!isEditing?
                <div className='postCaption'>
                  {caption &&
                    caption.map((word, index) => (
                      word.startsWith('#')?
                        <span key={index} className='tagLink'>{word}</span>
                      :
                        <span key={index} className='captionText'>{word}</span>
                    ))}
                </div>
              :
                <div className='editPostContainer'>
                  <textarea
                    className='editPost'
                    value={updatedCaption}
                    type='text'
                    onChange={e => {
                      setUpdatedCaption(e.target.value)}}>
                  </textarea>  
                  <div className='editPostOptions'>  
                    <div className='submitEdit' onClick={handleEdit}>Update</div>
                    <div className='submitEdit' onClick={() => setIsEditing(false)}>Cancel</div>
                  </div>
                </div>
              }
            </div>
            <div className='postTime'>{postTime}</div>
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
                <div className='editPostOptions'> 
                  <div className='submitEdit' onClick={() => {
                    postComment(newComment)
                    setCommenting(false)   
                  }}>Post</div>
                  <div className='submitEdit' onClick={() => setCommenting(false)}>Cancel</div>
                </div>
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
  </div>
  )
  :
  (
    <></>
  )
}
