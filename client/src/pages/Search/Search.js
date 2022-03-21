import Feed from '../..//components/Feed/Feed'
import './search.css'
import { useContext, useState, useEffect} from 'react'
import { PostContext } from '../../context/PostContext'
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search'

export default function Home() {
  const { postObject } = useContext(PostContext)
  const [query, setQuery] = useState('')
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (!query) return  
    const search = async () => {
      try {
        const res = await axios.get(`/posts/search?q=${query}`)
        console.log(res.data)
        setPosts(res.data)
      } catch(err) {
        console.error(err)
      }
    }
    search()
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
              <Feed content={posts}/>   
          </div>
        </>
    )
}