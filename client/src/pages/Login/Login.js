import './login.css'
import { Link } from 'react-router-dom'
import { useRef, useContext } from 'react'
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'

export default function Login() {
    const email = useRef()
    const password = useRef()
    const {isFetching, dispatch} = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        loginCall(
            {email: email.current.value, password: password.current.value}, 
            dispatch)
    }

    return (
        <div className='loginContainer'>
          <div className='loginWrapper'>
              <span className='loginLogo'>Reactor</span>
              <form className='loginForm' onSubmit={handleSubmit}>
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
                <button className='loginButton'>{isFetching? 'Loading' : 'Log In'}</button>
                <span className='forgotLogin'>Forgot Password?</span>
                <Link to='/register' className='registerButton'>Create Account</Link>
              </form>
          </div>         
        </div>
    )
}
