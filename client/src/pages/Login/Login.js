import './login.css'
import { Link } from 'react-router-dom'

export default function Login() {
    return (
        <div className='loginContainer'>
          <div className='loginOptions'>
              <span className='loginLogo'>Reactor</span>
              <div className='inputField'>
              <input placeholder='e-mail' className='input'/>
              </div>
              <div className='inputField'>
              <input placeholder='Password' className='input'/>
              </div>
              <button className='loginButton'>Log In</button>
              <span className='forgotLogin'>Forgot Password?</span>
              <Link to='/register' className='registerButton'>Create Account</Link>
          </div>         
        </div>
    )
}
