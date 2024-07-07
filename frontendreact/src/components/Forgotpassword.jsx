import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Navbar from './Navbar';
import Swal from 'sweetalert2';

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
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

  const submitForm = (e) => {
    e.preventDefault();
    Axios.post("https://budgetbuddy-b4zd.onrender.com/user/forgotPassword", {
      email,
    }).then(res => {
      if (res.data.status) {
        Swal.fire({
          title: "Check your email for reset password link",
          icon: "success",
          confirmButtonText: "Proceed",
        }).then(() => {
          navigate('/login');
          });
        }
      console.log(res.data)
    }).catch(err => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Look's like your email is not registered with us.",
        confirmButtonText: "Sign Up",
      }).then(()=>{
        navigate('/signup');
      });
    })
  };

  return (
    <div>
    <Navbar name="login" id="loginbtn"/>
    <div class="resetpwdcontainer">
      
      <div className='resetcard'>
        <h2>Password Reset</h2>
        <br></br>
        <p>An email containing a password reset link will be sent to the <br></br>provided email address.</p>
        <form className='resetform' id="password-reset-form" method="post" onSubmit={submitForm}>
          <input
            type="email"
            autoComplete='off'
            onChange={(e) => {
              setEmail(e.target.value);
              handleInputs(e);
            }}
            className='forminput'
            name="email"
            placeholder='Your Email'
            required
          />
          {errors.email && <span className='error'>{errors.email}</span>}
          <button type="submit" className='resetbtn'>SEND</button>
          <NavLink to="/login" className='resettologin'>Go Back</NavLink>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Forgotpassword