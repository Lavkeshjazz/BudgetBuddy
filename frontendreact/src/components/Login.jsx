import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUserContext } from './userContex';
import { GoArrowRight } from "react-icons/go";
import Swal from 'sweetalert2';
import Navbar1 from './Navbar1';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const userContext = useUserContext();

  const [errors, setErrors] = useState({
    email: '',
  })
  let name, value;

  const handleInputs=(e)=>{
    name=e.target.name;
    value=e.target.value;
    if(name==='email'){
      value = value.toLowerCase();
      setEmail(value); // Update state with lowercase email
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!regex.test(value)){
        setErrors({...errors,email: "*Invalid Email Format"})
      }
      else{
        setErrors({...errors,email:''})
      }
    }
  }

  async function loginuser(e) {
    e.preventDefault(); // Prevent default form submission
    try {
    const response = await fetch("https://budgetbuddy-b4zd.onrender.com/user/login", {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (response.ok) {
      Swal.fire({
        title: "Login Successful!",
        icon: "success",
        confirmButtonText: "Proceed",
      }).then(() => {
        response.json().then(userInfo => {
        userContext.login(userInfo.user_exist);
        navigate('/');
        });
      });
    } else{
      const data = await response.json();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data.error.message,
        confirmButtonText: "Try Again",
      });
    }
  } catch (error){
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: error.message || "An unexpected error occurred",
      confirmButtonText: "Try Again",
    });
  }
}

  return (
    <div>
    <Navbar1 name="login" id="loginbtn"/>
    <div className='log_in'>
      <div className='loginpage'>
        
        <div className='loginslide'>
          <div className='logincard'>
            <h2 className='logintitle' style={{ textShadow: 'none' }}>Sign in</h2>
            <form onSubmit={loginuser} className='loginform'> {/* Use onSubmit instead of method="post" */}
              <div className='form-group'>
                <input
                  className='forminput1'
                  type='text'
                  name='email'
                  id='email'
                  autoComplete='off'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    handleInputs(e);
                  }}
                  placeholder='Your Email'
                />
                {errors.email && <span className='error'>{errors.email}</span>}
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
                />
              </div>
            </form>
            <br />
          </div>
          <div className='logincard2'>
            <h2 className='logintitle1'>Unlock Exclusive Benefits: Sign Up Today!</h2>
            <p className='loginpara'>Welcome to BudgetBuddy, your ultimate destination for tracking prices and trends across top ecommerce platforms. By signing up, you join a community of savvy shoppers gaining valuable insights and saving money effortlessly.</p>
            <NavLink to="/signup" className='signup_redirect'>SIGN UP <GoArrowRight/></NavLink>
            <br />
          </div>
          <div className='logintosignup'></div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
