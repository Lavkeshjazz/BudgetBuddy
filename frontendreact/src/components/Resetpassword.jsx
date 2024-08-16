import React, { useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Resetpassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  const submitForm = async (e) => {
    e.preventDefault();
    const res = await fetch("https://budgetbuddy-1-s4a6.onrender.com/user/resetPassword/" + token, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password,
      })
    });
    if (res.ok) {
      Swal.fire({
        title: "Password Changed!",
        icon: "success",
        confirmButtonText: "Proceed",
      }).then(() => {
        navigate('/login');
        });
    }
    else if (res.status === 400) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:  "Somethin Went Wrong",
        confirmButtonText: "Sign Up",
      }).then(()=>{
        navigate('/forgotpwd');
      });
    }
  };
  return (
    <div class="resetpwdcontainer">
      <div className='resetcard'>
        <h2>Reset Your Password</h2>
        <form className='resetform' onSubmit={submitForm}>
          <input
            type="password"
            autoComplete='off'
            onChange={(e) => setPassword(e.target.value)}
            className='forminput'
            name="password"
            placeholder='New Password'
            required
          />
          <button type="Submit" className='resetbtn'>RESET</button>
          <NavLink to="/login" className='resettologin'>Go Back</NavLink>
        </form>
      </div>
    </div>

  );
}

export default Resetpassword