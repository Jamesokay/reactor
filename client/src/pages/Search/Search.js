import Feed from '../..//components/Feed/Feed'
import './search.css'
import { useContext, useState, useEffect} from 'react'
import { PostContext } from '../../context/PostContext'
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'

export default function Home() {
  const { postObject } = useContext(PostContext)
  const [query, setQuery] = useState('')
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (!query) return  

    const searchPosts = async () => {
      try {
        const res = await axios.get(`/posts/search?q=${query}`)
        setPosts(res.data)
      } catch(err) {
        console.error(err)
      }
    }

    const searchUsers = async () => {
      try {
        const res = await axios.get(`/users/search?q=${query}`)
        console.log(res.data)
        setUsers(res.data)
      } catch(err) {
        console.error(err)
      }
    }
    searchPosts()
    searchUsers()
  }, [query])

  useEffect(() => {
    if (query.length === 0) {
      setUsers([])
      setPosts([])
    }
  }, [query])


    return (
        <>
          <div className='searchContainer' style={postObject.postId? {opacity: '0.5'} : {opacity: '1'}}>
           <div className='searchBar'>
              <SearchIcon />
              <input
                 className='search'
                 placeholder='Search Reactor'
                 type='text'
                 value={query}
                 spellCheck='false'
                 onChange={e => {
                  setQuery(e.target.value)
                }}
              />
            </div>

            {users && (
              <div className='userResults'>
              {users.map((u) => (
                <div key= {u._id} className='userResult'>
                  {u.profilePicture?
                  <img className='userResultImg' src={u.profilePicture} alt='' />
                  :
                  <div className='userResultImgDefault'>
                    <PermIdentityIcon className='defaultIcon' />
                  </div>
                  }
                  <span className='userResultName'>{u.username}</span>
                </div>
              ))}
              </div>
            )}
              <Feed content={posts}/>   
          </div>
        </>
    )
}