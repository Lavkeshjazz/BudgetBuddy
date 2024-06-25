import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import "./Nav.css";
import { LuSun } from "react-icons/lu";

const Nav = (props) => {
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({ ProductURL: '', expectedPrice: null });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const Itemdata = async (e) => {
    setOpen(true);
    e.preventDefault();
    const { ProductURL, expectedPrice } = user;
    console.log("hello item data bhej rha hu");
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
    if (res) {
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        console.log('data sent');
        Navigate(`/searchitempage/${expectedPrice}`, { state: data });
        setOpen(false);
      }
      else if (res.status === 400) {
        const data = await res.json();
        console.log(data);
        window.alert(data.error.message);
      }
    }
  };
  return (
    <nav>
      {props.email && (
        <>
          <h2 className="navtitle">Welcome, <div className='email_section'>{props.email}</div><LuSun className="hello" /></h2>
        </>
      )}
      <h2 className="navtitle">SEARCH NEW PRODUCT</h2>
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

      </form>
    </nav>
  );
};
export default Nav;