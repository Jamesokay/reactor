import './rightBar.css'
import { Users } from '../../sampleData'

export default function RightBar() {
    return (
        <div className='rightBar'>
          <div className='rightBarWrapper'>
            <h4 className="rightBarTitle">Online</h4>
            <ul className="rightBarFriendsList">
              {Users.map((u) => (
                <li className="rightbarFriend" key={u.id}>
                  <img className="rightbarProfileImg" src={u.compImg} alt="" />
                  <span className="rightbarUsername">{u.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
    )
}
