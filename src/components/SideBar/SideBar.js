import RssFeedIcon from '@mui/icons-material/RssFeed';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import './sideBar.css'

export default function SideBar() {
    return (
        <div className='sideBar'>
          <div className="sideBarListWrapper">
            <ul className="sideBarList">
              <li className="sideBarListItem">
                <RssFeedIcon className="sideBarIcon" />
                <span className="sideBarListItemText">Feed</span>
              </li>
              <li className="sideBarListItem">
                <PeopleIcon className="sideBarIcon" />
                <span className="sideBarListItemText">Friends</span>
              </li>
              <li className="sideBarListItem">
                <GroupsIcon className="sideBarIcon" />
                <span className="sideBarListItemText">Groups</span>
              </li>
              <li className="sideBarListItem">
                <EventIcon className="sideBarIcon" />
                <span className="sideBarListItemText">Events</span>
              </li>
              <li className="sideBarListItem">
                <BookmarkIcon className="sideBarIcon" />
                <span className="sideBarListItemText">Saved</span>
              </li>
            </ul>
          </div>    
        </div>
    )
}
