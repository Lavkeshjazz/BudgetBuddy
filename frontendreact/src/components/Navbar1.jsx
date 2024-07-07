import React, { useEffect } from 'react';
import { useUserContext } from "./userContex";
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar1 = (props) => {
  const Navigate = useNavigate();
  const userContext = useUserContext();
  useEffect(() => {
    fetch('https://budgetbuddy-b4zd.onrender.com/user/authorized', {
      credentials: 'include',
    }).then((response) => {
      response.json().then(user => {
        userContext.login(user.user_exist);
      })
    })
    // eslint-disable-next-line
  }, []);
  function logout() {
    fetch('https://budgetbuddy-b4zd.onrender.com/logout', {
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
    <div className='navbar_container' style={{ position: 'fixed', width: '100%', top: 0, zIndex: 1000 }}>
      <div className='navbar'>
        <NavLink to="/" className="leftnavlink">
          <img src="/BUDGET BUDDY.png" alt="Budget Buddy Logo" style={{ width: '220px', height: '70px', paddingTop: '5px', filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))'}} />
        </NavLink>
        <ul className="rightnav">
          <li id={props.name === "home" ? props.id : ""} className="rightitem"><NavLink to="/">Home</NavLink></li>
          {uid && (
            <li id='loginbtn' className="rightitem">
              <NavLink onClick={logout}>Logout</NavLink>
            </li>
          )}
          {!uid && (
            <>
              <li id={props.name === "signin" ? props.id : ""} className="rightitem"><NavLink to="/signup">Sign Up</NavLink></li>
              <li id={props.name === "login" ? props.id : ""} className="rightitem"><NavLink to="/login">Sign In</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
export default Navbar1