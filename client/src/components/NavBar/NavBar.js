import './NavBar.css'
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, Link } from "react-router-dom"
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function NavBar() {
    const { userObject, setUserObject } = useContext(AuthContext)
    const [photo, setPhoto] = useState('')
    const [menuVisible, setMenuVisible] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
      console.log(userObject.user.profilePicture)
      setPhoto(userObject.user.profilePicture)
    }, [userObject, userObject.user.profilePicture])



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
                <ExploreOutlinedIcon />
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
              <Link to={`/${userObject.user.username}`}>
                <img className='navBarImg' src={photo} alt='' />
              </Link>
              <div className='navBarIconItem'>
                <KeyboardArrowDownIcon onClick={() => setMenuVisible(!menuVisible)}/>
              </div>
            {menuVisible && (
              <div className='navMenuContainer'>
                <ul className='navMenu'>
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
