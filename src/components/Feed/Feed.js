import './feed.css'
import Post from '../Post/Post'

export default function Feed() {
    return (
        <div className='feed'>
          <div className='feedWrapper'>
            <Post />
            <Post />
            <Post />
          </div>
        </div>
    )
}
