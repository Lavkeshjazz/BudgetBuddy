import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import "./Nav.css";
import Swal from 'sweetalert2';
const Nav = (props) => {
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({ ProductURL: '', expectedPrice: undefined });
  const [errors, setErrors] = useState(''); 
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    if(name === 'expectedPrice'){
      const regex=/^\d*$/;
      if(!regex.test(value)){
        setErrors({...errors, expectedPrice: "*Only digits allowed"});
      }
      else{
        setErrors({...errors, expectedPrice: ""});
      }
    }
    setUser({ ...user, [name]: value });
  };
  const Itemdata = async (e) => {
    e.preventDefault();

    // Validate if ProductURL is empty
    if (!user.ProductURL.trim()) {
      window.alert("Please enter a product link.");
      return;
    }
    setOpen(true);
    const { ProductURL, expectedPrice } = user;
    const res = await fetch('http://localhost:5000/searchproduct/', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ProductURL,
        expectedPrice
      })
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      setOpen(false);
      Swal.fire({
        title: "Item found!",
        text: "Click OK to proceed",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        Navigate(`/searchitempage/${expectedPrice}`, { state: data });
      });
    }
    else if (res.status === 400) {
      const data = await res.json();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data.error.message,
        confirmButtonText: "Try Again",
      }).then(()=>{
        Navigate('/collections');
      });
    }
  };
  return (
    <nav className='navdiv'>
      {props.email && (
        <div className="navtitle">
          <h2>Welcome,</h2>
          <div className='email_section'>{props.firstName} {props.lastName}</div>
        </div>
      )}
      <h2 className="navtitle1">TAG NEW PRODUCT</h2>
      <form className='home_form'>
        <input
          className='navforminput'
          type='text'
          name='ProductURL'
          id='ProductURL'
          autoComplete='off'
          value={user.ProductURL}
          onChange={handleInputs}
          placeholder='Paste Product Link'
        />
        <input
          className='navforminput'
          type='text'
          name='expectedPrice'
          id='expectedPrice'
          autoComplete='off'
          value={user.expectedPrice}
          onChange={handleInputs}
          placeholder='Enter Expected Price'
        />
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <button type="search" className='searchbtn' onClick={Itemdata}>Search</button>
        {errors.expectedPrice && <span className='error1'>{errors.expectedPrice}</span>}
      </form>
    </nav>
  );
};
export default Nav;