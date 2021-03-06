import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import './profile.css'
import { useParams, Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { AuthContext } from '../../context/AuthContext'

export default function Profile() {
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])
  const { userObject, setUserObject } = useContext(AuthContext)
  const [isFollowed, setIsFollowed] = useState(false)
  const username = useParams().username
  const [fileData, setFileData] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [newAbout, setNewAbout] = useState('')
  const [loadCount, setLoadCount] = useState(0)
  const [showBody, setShowBody] = useState(false)

  useEffect(() => {
    if (!username) return
    const fetchUser = async () => {
      const res = await axios.get(`https://reactorsocial.herokuapp.com/api/users?username=${username}`)
      setIsFollowed(userObject.user.following.includes(res.data._id))
      setUser(res.data)
      setNewAbout(res.data.about)
    }
    fetchUser()
  }, [username, userObject])

  useEffect(() => {
    if (!username) return
    const fetchPosts = async () => {
      const res = await axios.get("https://reactorsocial.herokuapp.com/api/posts/profile/" + username)
      setPosts(
        res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }))  
    }
    fetchPosts()
  }, [username])

  const follow = async () => {
    try {
      if (isFollowed) {
        const res = await axios.put(`https://reactorsocial.herokuapp.com/api/users/${user._id}/unfollow`, { userId: userObject.user._id })
        console.log(res)
        console.log('Unfollowed')
        setUserObject({
          ...userObject, 
            user: {...userObject.user, 
              following: userObject.user.following.filter((f) => f !== user._id)}})
      } else {
        const res = await axios.put(`https://reactorsocial.herokuapp.com/api/users/${user._id}/follow`, { userId: userObject.user._id })
        console.log(res)
        console.log('followed')
        setUserObject({
          ...userObject, 
            user: {...userObject.user, 
              following: [...userObject.user.following, user._id]}})
      }
      setIsFollowed(!isFollowed)
    } catch (err) {
      console.error(err)
    }
  }

  const handleFileChange = ({ target }) => {
    setFileData(target.files[0])
  } 

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(`https://reactorsocial.herokuapp.com/api/users/${user._id}`, {userId: userObject.user._id, about: newAbout})
      console.log(res)
      setUser({...user, about: newAbout})
      setNewAbout('')
      setIsUpdating(false)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (!fileData) return
    if (userObject.user._id !== user._id) return

    const changePhoto = async () => {
      const formData = new FormData()
      formData.append('userId', userObject.user._id)
      formData.append('profilePicture', fileData)
      try {
        const res = await axios.post('https://reactorsocial.herokuapp.com/api/users/profilephoto', formData)
        setUserObject(userObject => ({
          ...userObject,
          user: {...userObject.user,
            profilePicture: res.data
          }
        }))
      } catch(error) {
          console.log(error)
      }
    }
    changePhoto()
  }, [fileData, userObject.user._id, user._id, setUserObject])

  useEffect(() => {
    if (!posts) return

    if (posts.length === loadCount) {
      setShowBody(true)
    }

    return () => {
      setShowBody(false)
    }

  }, [posts, loadCount])
  
    return (
          <div className='profileContainer'>
            <div className='profileHeader' style={user.username? {opacity: '1'} : {}}>
              {fileData?
                <div className='profileHeaderPhotoContainer'>
                  <img className='profileHeaderPhoto' src={URL.createObjectURL(fileData)} alt='' />
                </div>
              :
                <div className='profileHeaderPhotoContainer'>
                  {(user.profilePicture)?
                    <img className={(user.username === userObject.user.username)? 'userProfileHeaderPhoto' : 'profileHeaderPhoto'} src={user.profilePicture} alt='' />
                    :
                    <></>
                  }
                  {(user.username === userObject.user.username) && (
                  <label htmlFor='file' className='editOption'>
                    <EditOutlinedIcon/>
                    <span>Edit</span>
                    <input 
                      style={{ display: "none" }}
                      id='file'
                      type='file'
                      name='file'
                      accept='image/*'
                      onChange={handleFileChange}
                      required>
                    </input>
                  </label>
                  )}
                </div>
              }
                <div className='profileInfo'>
                  <div className='profileInfoTop'>
                    <span className='profileHeaderName'>{user.username}</span>
                    {(user.username && user.username !== userObject.user.username) && (
                      <div className='followButton' onClick={() => follow()}>{isFollowed? 'Followed': 'Follow'}</div>
                    )}
                  </div>
                 {user.username === userObject.user.username?
                  <div className={isUpdating? 'updateProfileAbout' : 'profileAbout'}>
                  {isUpdating?
                    <div>
                      <textarea
                       className='updateAbout'
                       value={newAbout}
                       type='text'
                       onChange={e => {
                       setNewAbout(e.target.value)
                       }} ></textarea>              
                    </div>
                  :
                    <span>{user.about}</span>
                  }

                  {(user.username === userObject.user.username) && (
                  <div onClick={() => setIsUpdating(!isUpdating)}>
                    {(isUpdating)?
                    <div className='updateOptions'>
                      <div className='updateButton' onClick={handleSubmit}>Update</div>
                      <div className='updateButton'>Cancel</div>
                    </div>
                    :
                    <div className='editAboutOption'>
                      <EditOutlinedIcon />
                    </div>       
                    }
                  </div>
                  )}
                  </div>
                :
                  <span className={user.about? 'aboutText' : ''}>{user.about}</span>
                }


                  <div className='profileCounts'>
                      <span className='profileMetric'><b>{user.followers? user.followers.length : ''}</b> followers</span>
                      <span className='profileMetric'><b>{posts? posts.length : ''}</b> posts</span>
                      <span className='profileMetric'><b>{user.following? user.following.length : ''}</b> following</span>
                  </div>
                </div>
            </div>

           <div className='profileBodyWrapper' style={showBody? {visibility: 'visible'} : {}}>
            <div className='profileBody'>
              {posts.map((p) => (
                <Link key={p._id} to={`/post/${p._id}`}>
                  <div className='imgContainer'>
                    <div className='imgInfo'>
                      <div className='imgMetrics'>
                        <span className='imgLikes'>
                          <FavoriteIcon className='imgIcon'/>
                          <span>{p.likes.length}</span>
                        </span>
                        <span className='imgComments'>
                          <ChatBubbleIcon className='imgIcon'/>
                          <span>{p.comments.length}</span>
                        </span>
                      </div>
                    </div>
                    <img className='profilePostImg' src={p.img} alt='' onLoad={() => setLoadCount(loadCount + 1)}/>
                  </div>
                </Link>
              ))}
            </div>
            </div> 
          

          </div>
    )
}
