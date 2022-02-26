import './login.css'

export default function Login() {
    return (
        <div className='loginContainer'>
          <div className='loginOptions'>
              <span className='loginLogo'>Reactor</span>
              <div className='inputField'>
              <input placeholder='e-mail' className='emailInput'/>
              </div>
              <div className='inputField'>
              <input placeholder='Password' className='passwordInput'/>
              </div>
          </div>         
        </div>
    )
}
