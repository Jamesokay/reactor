import './comment.css'

export default function Comment({ comment }) {
    return (
        <div className='comment'>
          <img className='commentProfileImage' src={comment.profileImg} alt='' />
          <div className='commentBody'>
          <span>
            <span className='commentName'>{comment.username}</span>
            {comment.commentText}</span>
          </div>
      </div>
    )
}
