import NavBar from '../../components/NavBar/NavBar'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './profile.css'
import { useParams } from 'react-router-dom'

export default function Profile() {
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])
  const username = useParams().username
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    if (!username) return
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`)
      console.log(res.data)
      setUser(res.data)
    }
    fetchUser()
  }, [username])

  useEffect(() => {
    if (!username) return
    const fetchPosts = async () => {
      const res = await axios.get("/posts/profile/" + username)
      setPosts(res.data)   
    }
    fetchPosts()
  }, [username])
  
    return (
        <>
          <NavBar />
          <div className='profileContainer'>
            <div className='profileHeader'>
                <img className='profileHeaderPhoto'
                     src={user.profilePicture? PF + user.profilePicture : ''}
                     alt='' />
                <div className='profileInfo'>
                  <span className='profileHeaderName'>{user.username}</span>
                  <div className='profileCounts'>
                      <span className='profileMetric'><b>{user.followers? user.followers.length : ''}</b> followers</span>
                      <span className='profileMetric'><b>{posts? posts.length : ''}</b> posts</span>
                      <span className='profileMetric'><b>{user.following? user.following.length : ''}</b> following</span>
                  </div>
                </div>
            </div>
            <div className='profileBody'>
              {posts.map((p) => (
                <div key={p._id}><img src={PF + p.img} alt=''/></div>
              ))

              }
            </div>
          </div>
        </>
    )
}
