import './post.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function Post() {
    return (
        <div className='post'>
          <div className='postWrapper'>
            <div className='postTop'>
              <div className='postTopLeft'>
                <div className='profileImg' />
                <span>Poster Name</span>
              </div>
                <MoreHorizIcon className='postTopIcon'/>
            </div>
            <div className='postImg' />
            <div className='postBottom'>
              <FavoriteBorderIcon className='postIcon' />
              <ChatBubbleOutlineIcon className='postIcon' />
              <ShareIcon className='postIcon' />
              <BookmarkBorderIcon className='postIcon' />
            </div>    
          </div>      
        </div>
    )
}
