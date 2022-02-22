import './post.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Users } from '../../sampleData'

export default function Post({ post }) {
    return (
        <div className='post'>
          <div className='postWrapper'>
            <div className='postTop'>
              <div className='postTopLeft'>
                <img className='profileImg' 
                     src={Users.filter((u) => u.id === post?.userId)[0].profileImg}
                     alt=''
                />
                <span className='profileName'>{Users.filter((u) => u.id === post?.userId)[0].name}</span>
              </div>
              <div className='postIconRight'>
                <MoreVertIcon />
              </div>
            </div>
            <img className='postImg' src={post.image} alt='' />
            <div className='postCaption'>
              <span>{post.caption}</span>
            </div>
            <div className='postBottom'>
              <div className='postBottomLeft'>
                <div className='postIcon'>
                  <FavoriteBorderIcon />
                </div>
                <div className='postIcon'>
                  <ChatBubbleOutlineIcon />
                </div>
                <div className='postIcon'>
                  <ShareIcon />
                </div>
              </div>
              <div className='postIconRight'>
                <BookmarkBorderIcon />
              </div>
            </div>    
          </div>      
        </div>
    )
}
