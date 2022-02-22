import './rightBar.css'

export default function RightBar() {
    return (
        <div className='rightBar'>
          <div className='rightBarWrapper'>
            <h4 className="rightBarTitle">Online Friends</h4>
            <ul className="rightBarFriendsList">
              <li>Stan</li>
              <li>Joe</li>
              <li>Sarah</li>
            </ul>
          </div>
        </div>
    )
}
