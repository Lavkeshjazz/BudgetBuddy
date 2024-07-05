import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import Navbar1 from './Navbar1';
import Swal from 'sweetalert2';

const Otpverify = () => {
  const location = useLocation();
  const signupdata = location.state;
  console.log(signupdata.email);
  const { email } = signupdata;
  const [otp, setOtp] = useState('');
  const history = useNavigate();
  // -----------------------------------------------------
  async function otpdata(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/trader/verify", {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (response.ok) {
      e.preventDefault();
      const { firstName, lastname, phone_number, email, password, userType } = signupdata;
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
          title: "Registration Successful",
          text: "OTP Matched Successfully",
          icon: "success",
          confirmButtonText: "Sign In",
        }).then(() => {
          history('/login');
        });
      }
      else if (res.status === 400) {
        const data = await res.json();
        Swal.fire({
          icon: "error",
          title: data.error.code,
          text: data.error.message ,
          confirmButtonText: "Try Again",
        });
      }
    }
    else {
      Swal.fire({
        icon: "error",
        title: "OTP Not Matched",
        text: "Please enter the OTP correctly" ,
        confirmButtonText: "Try Again",
      });
    }
  }
  // -----------------------------------------------------
  return (
    <div>
    <Navbar1 name="signin" id="loginbtn"/>
    <div className='otpverifypage'>
      <div className='otpcard'>
        <h1 className='otptitle'>Two Step Verification</h1>
        <p className='otpdesc'>Enter the verification code sent to</p>
        <p className='otpemail'>{email}</p>
        <p className='otpdesc2'>Type your 6 digit security code</p>
        <div className='otpinput'>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
        </div>
        <button className='otpbtn' onClick={otpdata}>Submit</button>
      </div>
    </div>
    </div>
  )
}

export default Otpverify