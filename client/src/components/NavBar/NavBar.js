import './NavBar.css'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom"
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function NavBar() {
    const { setUserObject } = useContext(AuthContext)
    const navigate = useNavigate()

    const logOut = () => {
      setUserObject({user: null, isFetching: false, error: false})
      navigate('/')
    }

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
              <div className="topbarIconItem">
                <LogoutIcon onClick={() => logOut()}/>
              </div>
            </div>
          </div>
        </div>
    )
}
