import './feed.css'
import Post from '../Post/Post'
import { Posts } from '../../sampleData'

export default function Feed() {
    return (
        <div className='feed'>
          <div className='feedWrapper'>
            {Posts.map((p) => (
              <Post key={p.id} post={p} />
            ))
            }
          </div>
        </div>
    )
}
