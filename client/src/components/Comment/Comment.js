import './comment.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Comment({ comment }) {
  const [profilePicture, setProfilePicture] = useState('')

  useEffect(() => {
    if (!comment) return
    const fetchUser = async () => {
      const res = await axios.get(`https://reactorsocial.herokuapp.com/api/users?username=${comment.username}`)
      setProfilePicture(res.data.profilePicture)
    }
    fetchUser()
  }, [comment])

    return (
        <div className='comment'>
          <img className='commentProfileImage' src={profilePicture} alt='' />
          <div className='commentBody'>
            <span>
              <span className='commentName'>{comment.username}</span>
              {comment.commentText}
            </span>
          </div>
      </div>
    )
}
