import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";
import Swal from 'sweetalert2';
import Navbar from "./Navbar";

const Signup = () => {
  const history = useNavigate();
  const [user, setUser] = useState({
    firstName: '',
    lastname: '',
    phone_number: '',
    email: '',
    password: '',
    userType: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastname: '',
    phone_number: '',
    email: '',
    password: '',
  })

  let name, value;

  const handleInputs = (e) => {
    //It is taking input as key value pair
    //here key is name like firstname,lastname,email
    //here value is it's value
    name = e.target.name;
    value = e.target.value;
    if(name === 'firstName' || name==='lastname'){
      const regex = /^[a-zA-Z]*$/;
      if(!regex.test(value)){
        setErrors({...errors,[name]: "*Only Alphabetical letters are allowed."})
      }
      else{
        setErrors({...errors, [name]: ''})
      }
    }
    else if(name==='phone_number'){
      const regex=/^[0-9]*$/;
      if(!regex.test(value)){
        setErrors({...errors,phone_number: "*Only Numberic digits are allowed."})
      }
      if(value.length !== 10){
        setErrors({...errors,phone_number: "*The length of Phone number should only be 10"})
      }
      else{
        setErrors({...errors,phone_number: ''});
      }
    }
    else if(name==='email'){
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!regex.test(value)){
        setErrors({...errors,email: "*Invalid Email Format"})
      }
      else{
        setErrors({...errors,email:''})
      }
    }
    else if(name==='password'){
      if(value.length<8){
        setErrors({...errors,password:"*Too Weak Level Password"})
      }
      else if(value.length>=8 && value.length<13){
        setErrors({...errors,password:"*Medium Level Password"})
      }
      else{
        setErrors({...errors,password:''});
      }
    }
    else if (name === 'userType') {
      if (value === '') {
        setErrors({...errors, userType: "*Please select a user type."});
      } else {
        setErrors({...errors, userType: ''});
      }
    }
    setUser({ ...user, [name]: value });
  };

  const handleUserTypeChange = (e) => {
    setUser({ ...user, userType: e.target.value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { firstName, lastname, phone_number, email, password, userType } = user;
    console.log("hello from postdata");
    const res = await fetch('http://localhost:5000/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName,
        lastName: lastname,
        phone_number,
        email,
        password,
        userType
      })
    });
    if (res.ok) {
      Swal.fire({
        title: "Good job!",
        text: "Registration Successful!",
        icon: "success",
        confirmButtonText: "Proceed",
      }).then(() => {
        history('/login');
      });
    } else if (res.status === 400) {
      const data = await res.json();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data.error.message,
        confirmButtonText: "Try Again",
      });
    }
  };

  // Check if there are any errors
  const isDisabled = Object.values(errors).some(error => error !== '') || Object.values(user).some(value => value === '');

  // Enable button only if there are no errors and userType is selected
  const buttonDisabled = isDisabled || user.userType === '';

  return (
    <div className='signup'>
      <Navbar name="signin" id="loginbtn"/>
      <div className='signuppage'>
        <div className='signpuslide'>
          <div className='signupform2'>
            <h1 className='logintitle'>Welcome Back!</h1>
            <p className='signintext'>If you already have an account, please log in to access your price tracking dashboard and get the latest updates on your favorite products.</p>
            <NavLink to='http://localhost:3000/login' className='signin_redirect'><GoArrowLeft />SIGN IN</NavLink>
          </div>
          <form className='signupform' id='register-form'>
          <h1 className='logintitle' style={{ textShadow: 'none' }}>Sign Up</h1>
          <div className='form-group'>
            <input
              className='forminput2'
              type='text'
              name='firstName'
              id='firstName'
              autoComplete='off'
              value={user.firstName}
              onChange={handleInputs}
              placeholder='First Name'
            />
            {errors.firstName && <span className='error'>{errors.firstName}</span>}
            </div>

            <div className='form-group'>
              <input
                className='forminput2'
                type='text'
                name='lastname'
                id='lastname'
                autoComplete='off'
                value={user.lastname}
                onChange={handleInputs}
                placeholder='Last Name'
              />
              {errors.lastname && <span className='error'>{errors.lastname}</span>}
            </div>

            <div className='form-group'>
              <input
                className='forminput2'
                type='number'
                name='phone_number'
                id='phone_number'
                autoComplete='off'
                value={user.phone_number}
                onChange={handleInputs}
                placeholder='Phone'
              />
              {errors.phone_number && <span className='error'>{errors.phone_number}</span>}
            </div>

            <div className='form-group'>
              <input
                className='forminput2'
                type='email'
                name='email'
                id='email'
                autoComplete='off'
                value={user.email}
                onChange={handleInputs}
                placeholder='Email'
              />
              {errors.email && <span className='error'>{errors.email}</span>}
            </div>

            <div className='form-group'>
              <input
                className='forminput2'
                type='password'
                name='password'
                id='password'
                autoComplete='off'
                value={user.password}
                onChange={handleInputs}
                placeholder='Password'
              />
              {errors.password && <span className='error'>{errors.password}</span>}
            </div>

            <div className='form-group'>

              <select
                className='forminput3'
                name='userType'
                id='userType'
                value={user.userType}
                onChange={handleUserTypeChange}
                placeholder='User Type:'
              >
                <option value=''>Select User Type</option>
                <option value='user'>User</option>
                <option value='trader'>Trader</option>
              </select>
              {errors.userType && <span className='error'>{errors.userType}</span>}
            </div>

            <div className='form-group form-button'>
              <input
                type='submit'
                name='signup'
                id='signup'
                className='signinbtn'
                value='REGISTER'
                onClick={PostData}
                disabled={buttonDisabled}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup;
