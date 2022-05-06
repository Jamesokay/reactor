import './feed.css'
import Post from '../Post/Post'
import { LoadContext } from '../../context/LoadContext'
import { useContext, useState, useEffect } from 'react'

export default function Feed({ content }) {
    const { loadCount, setLoadCount } = useContext(LoadContext)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
      setIsLoaded(false)
      setLoadCount(0)
    }, [setLoadCount])

    useEffect(() => {
      if (content.length === loadCount) {
        setIsLoaded(true)
      }
    }, [content.length, loadCount])



    return (
        <div className='feed'>
          <div className='feedGridWrapper'>
          <div className='feedGrid' style={isLoaded? {opacity: '1'} :{}}>
          {content.map((p) => (
            <Post key={p._id} post={p} />
          ))}
          </div>
          </div>
        </div>
    )
}
