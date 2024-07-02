import { useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useUserContext } from "./userContex";
import { GoArrowRight } from "react-icons/go";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const userContext = useUserContext();
  async function loginuser(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/user/login", {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (response.ok) {
      window.alert("Login Successful");
      response.json().then(userInfo => {
        userContext.login(userInfo.user_exist);
        navigate('/');
      })
    }
    else {
      alert('Please fill the details correctly.');
    }
  }
  return (
    <div className='log_in'>
      <div className='loginpage'>
        <div className='loginslide'>
          <div className='logincard'>
            <h2 className='logintitle'>Sign in</h2>
            <form method="post" className='loginform'>
              <div className='form-group'>
                <input
                  className='forminput1'
                  type='text'
                  name='email'
                  id='email'
                  autoComplete='off'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Your Email'
                />
              </div>
              <div className='form-group'>
                <input
                  className='forminput1'
                  type='password'
                  name='password'
                  id='password'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autoComplete='off'
                  placeholder='Password'
                />
              </div>
              <NavLink to="/forgotpwd" className='alreadyacc'>Forgot your password?</NavLink>
              <div className='form-group form-button'>
                <input
                  type='submit'
                  name='signin'
                  id='signin'
                  className='signinbtn'
                  value='SIGN IN'
                  onClick={loginuser}
                />
              </div>
            </form>
            <br />
          </div>
          <div className='logincard2'>
            <h2 className='logintitle'>Hello, Friend!</h2>
            <p className='loginpara'>Enter your personal details and start journey with us</p>
            <NavLink to="/signup" className='signup_redirect'>SIGN UP<GoArrowRight/></NavLink>
            <br />
          </div>
          <div className='logintosignup'></div>
        </div>
      </div>
    </div>
  )
}

export default Login