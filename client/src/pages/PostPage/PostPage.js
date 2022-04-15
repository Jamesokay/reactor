import './postPage.css'
import { PostContext } from '../../context/PostContext'
import { useContext, useEffect } from 'react'
import useViewPort from '../../hooks/useViewPort'
import { useNavigate } from 'react-router-dom'
import PostLarge from '../../components/PostLarge/PostLarge'

export default function PostPage() {
    const { postObject, setPostObject } = useContext(PostContext)
    const { width } = useViewPort()
    const navigate = useNavigate()
  
    useEffect(() => {
      if (width > 1000) {
        navigate(-1)
      } 
    }, [postObject.post, width, setPostObject, navigate])

    return postObject.post? (
        <div className='postPageContainer'>
          <PostLarge />         
        </div>
    ) :
    (
        <></>
    )
}
