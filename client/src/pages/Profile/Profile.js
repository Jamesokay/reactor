import NavBar from '../../components/NavBar/NavBar'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import './profile.css'
import { useParams } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import { AuthContext } from '../../context/AuthContext'

export default function Profile() {
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])
  const { userObject, setUserObject } = useContext(AuthContext)
  const [isFollowed, setIsFollowed] = useState(false)
  const username = useParams().username
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    if (!username) return
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`)
      setIsFollowed(userObject.user.following.includes(res.data._id))
      setUser(res.data)
    }
    fetchUser()
  }, [username, userObject])

  useEffect(() => {
    if (!username) return
    const fetchPosts = async () => {
      const res = await axios.get("/posts/profile/" + username)
      setPosts(res.data)   
    }
    fetchPosts()
  }, [username])

  const follow = async () => {
    try {
      if (isFollowed) {
        const res = await axios.put(`/users/${user._id}/unfollow`, { userId: userObject.user._id })
        console.log(res)
        console.log('Unfollowed')
        setUserObject({
          ...userObject, 
            user: {...userObject.user, 
              following: userObject.user.following.filter((f) => f !== user._id)}})
      } else {
        const res = await axios.put(`/users/${user._id}/follow`, { userId: userObject.user._id })
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
  
    return (
        <>
          <NavBar />
          <div className='profileContainer'>
            <div className='profileHeader'>
                <img className='profileHeaderPhoto'
                     src={user.profilePicture? PF + user.profilePicture : ''}
                     alt='' />
                <div className='profileInfo'>
                  <div className='profileInfoTop'>
                    <span className='profileHeaderName'>{user.username}</span>
                    {user.username !== userObject.user.username && (
                      <div className='followButton' onClick={() => follow()}>{isFollowed? 'Unfollow ': 'Follow'}</div>
                    )}
                  </div>
                  <div className='profileCounts'>
                      <span className='profileMetric'><b>{user.followers? user.followers.length : ''}</b> followers</span>
                      <span className='profileMetric'><b>{posts? posts.length : ''}</b> posts</span>
                      <span className='profileMetric'><b>{user.following? user.following.length : ''}</b> following</span>
                  </div>
                </div>
            </div>
            <div className='profileBody'>
              {posts.map((p) => (
                <div key={p._id} className='imgContainer'>
                  <div className='imgInfo'>

                  <div className='imgMetrics'>
                    <span className='imgLikes'>
                      <FavoriteIcon className='imgIcon'/>
                      <span>200</span>
                    </span>
                    <span className='imgComments'>
                      <ChatBubbleIcon className='imgIcon'/>
                      <span>125</span>
                    </span>
                  </div>

                  </div>
                  <img src={PF + p.img} alt=''/>
                </div>
              ))

              }
            </div>
          </div>
        </>
    )
}
