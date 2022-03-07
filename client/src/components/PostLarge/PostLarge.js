import './postLarge.css'
import { useContext } from 'react'
import { PostContext } from '../../context/PostContext'

export default function PostLarge() {
    const { postObject, setPostObject } = useContext(PostContext)
    return (
        <div className='postLargeContainer' style={postObject.img? {display: 'flex'} : {}}>
            <img src={postObject.img} alt='' onClick={() => setPostObject({userId: '', desc: '', img: '', likes: []})}/>
        </div>
    )
}
