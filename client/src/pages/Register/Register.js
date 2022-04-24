import './register.css'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function Register() {
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const passwordRepeat = useRef()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (passwordRepeat.current.value !== password.current.value) {
      console.log('Password did not match')
    } 
    else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      try {
        await axios.post('https://reactorsocial.herokuapp.com/api/auth/register', user)
        navigate('/login')
      } catch (err) {
        console.log(err)
      }
    }
  }

    return (
         <div className='loginContainer'>
            <span className='loginLogo'>Reactor</span>
            <div className='loginWrapper'>
            <form className='registerForm' onSubmit={handleSubmit}>
            <div className='inputField'>
              <input placeholder='Username' ref={username} className='input' required />
            </div>
            <div className='inputField'>
              <input placeholder='Email' type='email' ref={email} className='input' required />
            </div>
            <div className='inputField'>
              <input placeholder='Password' type='password' ref={password} className='input' required />
            </div>
            <div className='inputField'>
              <input placeholder='Confirm password' type='password' ref={passwordRepeat} className='input' required />
            </div>
              <button className='loginButton' type='submit'>Sign Up</button>    
            </form> 
          </div>     
        </div>
    )
}
