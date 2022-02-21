import './NavBar.css'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';

export default function NavBar() {
    return (
        <div className='navBarContainer'>
          <div className='navBarLeft'>
              <span className='logo'>Reactor</span>
          </div>
          <div className='navBarCenter'>
            <div className="searchbar">
              <SearchIcon className='searchIcon'/>
              <input
                placeholder="Search Reactor"
                className="searchInput"
              />
            </div>
          </div>
          <div className='navBarRight'>
            <div className="topbarIcons">
              <div className="topbarIconItem">
                <PersonIcon />
              </div>
              <div className="topbarIconItem">
                <ChatBubbleIcon />
              </div>
              <div className="topbarIconItem">
                <NotificationsIcon />
              </div>
              <div className="topbarIconItem">
                <LogoutIcon />
              </div>
            </div>
          </div>
        </div>
    )
}
