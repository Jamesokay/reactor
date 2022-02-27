import './register.css'

export default function Register() {
    return (
         <div className='registerContainer'>
          <div className='registerOptions'>
          <span className='registerLogo'>Reactor</span>
          <div className='inputField'>
            <input placeholder='Email' type='email' className='input' />
          </div>
          <div className='inputField'>
            <input placeholder='Password' type='password' className='input' />
          </div>
          <div className='inputField'>
            <input placeholder='Confirm password' type='password' className='input' />
          </div>
            <button className='signupButton'>Sign Up</button>
          </div>          
        </div>
    )
}
