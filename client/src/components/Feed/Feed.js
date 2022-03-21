import './feed.css'
import Post from '../Post/Post'

export default function Feed({ content }) {
    return (
        <div className='feed'>
          <div className='feedGrid'>
          {content.map((p) => (
            <Post key={p._id} post={p} />
          ))}
          </div>
        </div>
    )
}
