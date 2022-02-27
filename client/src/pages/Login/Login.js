import './login.css'
import { Link } from 'react-router-dom'
import { useRef, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

export default function Login() {
    const email = useRef()
    const password = useRef()
    const { userObject, setUserObject } = useContext(AuthContext)

    const loginCall = async (e) => {
      e.preventDefault()
      setUserObject({...userObject, isFetching: true})
      try {
          const res = await axios.post('auth/login', {email: email.current.value, password: password.current.value})
          setUserObject({user: res.data, isFetching: false, error: false})
      } catch(err) {
          setUserObject({...userObject, error: err})
      }
    }

    return (
        <div className='loginContainer'>
          <div className='loginWrapper'>
              <span className='loginLogo'>Reactor</span>
              <form className='loginForm' onSubmit={loginCall}>
                <div className='inputField'>
                  <input 
                    placeholder='e-mail' 
                    type='email' 
                    required
                    className='input'
                    ref={email}
                    />
                </div>
                <div className='inputField'>
                  <input 
                    placeholder='Password' 
                    type='password'
                    required 
                    minLength='6'
                    className='input'
                    ref={password}
                    />
                </div>
                <button className='loginButton'>{userObject.isFetching? 'Loading' : 'Log In'}</button>
                <span className='forgotLogin'>Forgot Password?</span>
                <Link to='/register' className='registerButton'>Create Account</Link>
              </form>
          </div>         
        </div>
    )
}
