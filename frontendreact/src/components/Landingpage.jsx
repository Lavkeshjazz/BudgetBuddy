import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { useUserContext } from "./userContex";
import Navbar from './Navbar';

const Landingpage = () => {
  const userContext = useUserContext();
  useEffect(() => {
    fetch('http://localhost:5000/user/authorized', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        userContext.login(userInfo);
      })
    })
    // eslint-disable-next-line
  }, []);

  const username = userContext.user;
  return (
    <div className='landing'>
      <Navbar name="home" id="loginbtn"/>
      <div className='landingpage'>
        <div className='blur1'></div>
        <h1 className='landingtitle'><span className='highlight'>Track</span>,<span className='highlight'> Compare</span>,<span className='highlight'> Save</span> to Unlock Best Deals.</h1>
        <p className='landingdetails'>
          <div className="icon-text-container">
            <img className="icons" src="/keybenefits.png" style={{ width: '60px', height: '60px', paddingTop: '5px', filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))' }} />
            <span className='highlight3'>Key Benefits :</span>
          </div>
          <div className="icon-text-container">
            <img className="icons" src="/notifications.png" style={{ width: '55px', height: '55px', paddingTop: '5px', filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))' }} />
            <span><span className='highlight2'>Personalized Alerts</span>: Receive instant notifications when prices drop on your favorite products.</span>
          </div>
          <div className="icon-text-container">
            <img className="icons" src="/trend.png" style={{ width: '60px', height: '75px', paddingTop: '5px', filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))' }} />
            <span><span className='highlight2'>Trend Analysis</span>: Access detailed insights on trending products and popular buys.</span>
          </div>
          <div className="icon-text-container">
            <img className="icons" src="/scales.png" style={{ width: '60px', height: '68px', paddingTop: '5px', filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))' }} />
            <span><span className='highlight2'>Comparison Tools</span>: Compare prices across multiple stores to find the best deals.</span>
          </div>
          <div className="icon-text-container">
            <img className="icons" src="/pricetrack.png" style={{ width: '60px', height: '60px', paddingTop: '5px', filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))' }} />
            <span><span className='highlight2'>Track Price History</span>: Track product price history from e-commerce websites effortlessly.</span>
          </div>
        </p>
        <div className='input'>
          {!username && <NavLink to='http://localhost:3000/login'><button className='landingbtn'>Get Started</button></NavLink>}
          {username && <NavLink to='http://localhost:3000/collections'><button className='landingbtn'>Go to Collections</button></NavLink>}
        </div>
        <footer>
           <p class="footer">Your privacy is important to us. We never share your information with third parties.</p>
        </footer>
      </div>
    </div>
  )
}

export default Landingpage