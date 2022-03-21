import './NavBar.css'
// import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom"
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function NavBar() {
    const { userObject } = useContext(AuthContext)
//    const navigate = useNavigate()

    // const logOut = () => {
    //   setUserObject({user: null, isFetching: false, error: false})
    //   navigate('/')
    // }

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
                <KeyboardArrowDownIcon />
              </div>
          </div>
        </div>
    )
}
