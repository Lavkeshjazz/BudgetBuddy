import React, { useEffect } from 'react';
import { useUserContext } from "./userContex";
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const Navigate = useNavigate();
  const userContext = useUserContext();
  useEffect(() => {
    fetch('http://localhost:5000/user/authorized', {
      credentials: 'include',
    }).then((response) => {
      response.json().then(user => {
        userContext.login(user.user_exist);
      })
    })
    // eslint-disable-next-line
  }, []);
  function logout() {
    fetch('http://localhost:5000/logout', {
      credentials: 'include',
      method: 'GET',
    }).then(() => {
      userContext.logout();
      Navigate('/login');
    })
  }
  const uid = userContext.user;
  if(uid)  console.log(uid);
  return (
    <div className='navbar_container'>
      <div className='navbar'>
        <NavLink to="/" className="leftnavlink">
          <div className='leftnav'>
            <div className='navlogo'>BUDGET</div><div className='buddy'>BUDDY</div>
          </div>
        </NavLink>
        <ul className="rightnav">
          <li className="rightitem"><NavLink to="/">Home</NavLink></li>
          <li className="rightitem"><NavLink to="/search">Search</NavLink></li>
          <li className="rightitem"><NavLink to="/collections">Collections</NavLink></li>
          {uid && (
            <li id='loginbtn' className="rightitem">
              <NavLink onClick={logout}>Logout</NavLink>
            </li>
          )}
          {!uid && (
            <>
              <li className="rightitem"><NavLink to="/signup">Sign Up</NavLink></li>
              <li id='loginbtn' className="rightitem"><NavLink to="/login">Log In</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
export default Navbar