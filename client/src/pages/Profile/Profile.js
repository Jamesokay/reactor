import NavBar from '../../components/NavBar/NavBar'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './profile.css'
import { useParams } from 'react-router-dom'

export default function Profile() {
  const [user, setUser] = useState({})
  const username = useParams().username

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      console.log(res.data)
      setUser(res.data);
    };
    fetchUser();
  }, [username]);
  
    return (
        <>
          <NavBar />
          <div className='profileContainer'>
            <div className='profileHeader'>
                <img className='profileHeaderPhoto'
                     src={`http://localhost:3000/${user.profilePicture}`}
                     alt='' />
                <div className='profileInfo'>
                  <span className='profileHeaderName'>{user.username}</span>
                  <div className='profileCounts'>
                      <span className='profileMetric'><b>247</b> followers</span>
                      <span className='profileMetric'><b>9</b> posts</span>
                      <span className='profileMetric'><b>112</b> following</span>
                  </div>
                  <span>I'm Ben, a completely fictional person.</span>
                </div>
            </div>
            <div className='profileBody'>
              <div className='test'></div>
              <div className='test'></div>
              <div className='test'></div>
              <div className='test'></div>
              <div className='test'></div>
              <div className='test'></div>
              <div className='test'></div>
              <div className='test'></div>
              <div className='test'></div>
            </div>
          </div>
        </>
    )
}
