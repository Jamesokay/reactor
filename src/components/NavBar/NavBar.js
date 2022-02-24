import './NavBar.css'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom"

export default function NavBar() {
    return (
        <div className='navBarContainer'>
          <div className='navBarLeft'>
              <Link to='/' className='logo'>Reactor</Link>
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
              <Link to='/' className="topbarIconItem">
                <RssFeedIcon />
              </Link>
              <div className="topbarIconItem">
                <NotificationsIcon />
              </div>
              <div className="topbarIconItem">
                 <PersonIcon />
              </div>
              <Link to='/login' className="topbarIconItem">
                <LogoutIcon />
              </Link>
            </div>
          </div>
        </div>
    )
}
