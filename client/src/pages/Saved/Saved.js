import Feed from '../..//components/Feed/Feed'
import './saved.css'
import { useContext } from 'react'
import { PostContext } from '../../context/PostContext'

export default function Home() {
  const { postObject } = useContext(PostContext)
    return (
        <>
          <div className='savedContainer' style={postObject.postId? {opacity: '0.5'} : {opacity: '1'}}>
              <Feed type='saved'/>
          </div>
        </>
    )
}