import './postLarge.css'
import { useContext } from 'react'
import { PostContext } from '../../context/PostContext'
import { Link } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';

export default function PostLarge() {
    const { postObject, setPostObject } = useContext(PostContext)
    return (
        <div className='postLargeContainer' style={postObject.img? {display: 'flex'} : {}}>
            <img className='postLargeImage' src={postObject.img} alt='' />
            <div className='postLargeSideBar'>
              <div className='postSideBarTop'>
                <div className='postSideBarTopLeft'>
                  <img className='postSideBarProfileImage' src={postObject.postAuthor.profilePicture} alt='' />
                  <Link 
                    to={`/profile/${postObject.postAuthor.username}`} 
                    className='postSideBarProfileName'
                    onClick={() => setPostObject({userId: '', desc: '', img: '', likes: [], postAuthor: {}})}   
                    >{postObject.postAuthor.username}</Link>
                </div>
                <CloseIcon className='closeIcon' onClick={() => setPostObject({userId: '', desc: '', img: '', likes: [], postAuthor: {}})}/>
              </div>
            </div>
        </div>
    )
}
