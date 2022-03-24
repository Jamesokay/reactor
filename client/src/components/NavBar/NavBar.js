import './NavBar.css'
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate, Link } from "react-router-dom"
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function NavBar() {
    const { userObject, setUserObject } = useContext(AuthContext)
    const [menuVisible, setMenuVisible] = useState(false)
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
            <div className='navBarIcons'>
              <Link to='/' className='navBarIconItem'>
                <HomeIcon />
              </Link>
              <Link to='/search' className='navBarIconItem'>
                <SearchIcon />
              </Link>
              <Link to='/upload' className='navBarIconItem'>
                <AddBoxOutlinedIcon />
              </Link>
              <Link to='/saved' className='navBarIconItem'>
                <FavoriteBorderIcon />
              </Link>
            </div>
          </div>

          <div className='navBarRight'>
              <img className='navBarImg' src={userObject.user.profilePicture} alt='' />
              <div className='navBarIconItem'>
                <KeyboardArrowDownIcon onClick={() => setMenuVisible(!menuVisible)}/>
              </div>
            {menuVisible && (
              <div className='navMenuContainer'>
                <ul className='navMenu'>
                  <li className='navMenuOption'>
                    <PersonIcon className='navMenuIcon' />
                    <span>Edit Profile</span>
                  </li>
                  <li className='navMenuOption'>
                    <SettingsIcon className='navMenuIcon' />
                    <span>Account Settings</span>
                  </li>
                  <li className='navMenuOption' onClick={() => logOut()}>
                    <LogoutIcon className='navMenuIcon' />
                    <span>Log Out</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
    )
}
