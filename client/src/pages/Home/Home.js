import Feed from '../..//components/Feed/Feed'
import './Home.css'
import { useContext } from 'react'
import { PostContext } from '../../context/PostContext'

export default function Home() {
  const { postObject } = useContext(PostContext)
    return (
        <>
          <div className='homeContainer' style={postObject.postId? {opacity: '0.5'} : {opacity: '1'}}>
              <Feed />
          </div>
        </>
    )
}
