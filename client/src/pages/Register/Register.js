import './register.css'

export default function Register() {
    return (
         <div className='registerContainer'>
          <div className='registerOptions'>
          <span className='registerLogo'>Reactor</span>
          <div className='inputField'>
            <input placeholder='Email' className='input' />
          </div>
          <div className='inputField'>
            <input placeholder='Password' className='input' />
          </div>
          <div className='inputField'>
            <input placeholder='Confirm password' className='input' />
          </div>
            <button className='signupButton'>Sign Up</button>
          </div>          
        </div>
    )
}
