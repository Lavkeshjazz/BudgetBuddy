import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { useUserContext } from "./userContex";
import Navbar from './Navbar';
import Navbar1 from './Navbar1';
import { GrLogin } from "react-icons/gr";

const Landingpage = () => {
  const userContext = useUserContext();
  useEffect(() => {
    fetch('https://budgetbuddy-b4zd.onrender.com/user/authorized', {
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
      {!username && <Navbar1 name="home" id="loginbtn" />}
      {username && <Navbar name="home" id="loginbtn" />}
      <div className='landingpage'>
        <div className='blur1'></div>
        <div className='blur2'></div>
        <div className='blur3'></div>
        <div className='landingcard'>
          <h1 className='landingtitle'><span className='highlight'>Track</span>,<span className='highlight'> Compare</span>,<span className='highlight'> Save</span> <br></br>to Unlock Best Deals.</h1>
          <p className='landingdetails1'>Stay ahead of the curve with real-time price updates on our <br></br>comprehensive tracking website.</p>
          <div className='input'>
            {!username && <NavLink to='/login'><button className='landingbtn'>Get Started</button></NavLink>}
            {username && <NavLink to='/collections'><button className='landingbtn'>Go to Collections <GrLogin /></button></NavLink>}
          </div>
        </div>
        <div className='blur4'></div>
        <div className='blur5'></div>
        <div className='blur6'></div>
        <div className='landingcard1'>
          <p className='landingdetails'>
            <div className="icon-text-container">
              <img alt='' className="icons" src="/keybenefits.png" style={{ width: '55px', height: '55px', paddingTop: '5px', filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))' }} />
              <span className='highlight3'>Key Benefits :</span>
            </div>
            <div className="icon-text-container">
              <img alt='' className="icons" src="/notifications.png" style={{ width: '50px', height: '50px', paddingTop: '5px', filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))' }} />
              <span><span className='highlight2'>Personalized Alerts</span>: Receive instant notifications when prices drop on your favorite products.</span>
            </div>
            <div className="icon-text-container">
              <img alt='' className="icons" src="/trend.png" style={{ width: '55px', height: '70px', paddingTop: '5px', filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))' }} />
              <span><span className='highlight2'>Trend Analysis</span>: Access detailed insights on trending products and popular buys.</span>
            </div>
            <div className="icon-text-container">
              <img alt='' className="icons" src="/scales.png" style={{ width: '55px', height: '63px', paddingTop: '5px', filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))' }} />
              <span><span className='highlight2'>Comparison Tools</span>: Compare prices across multiple stores to find the best deals.</span>
            </div>
            <div className="icon-text-container">
              <img alt='' className="icons" src="/pricetrack.png" style={{ width: '55px', height: '55px', paddingTop: '5px', filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))' }} />
              <span><span className='highlight2'>Track Price History</span>: Track product price history from e-commerce websites effortlessly.</span>
            </div>
          </p>
          <footer>
            <p class="footer">Your privacy is important to us. We never share your information with third parties.</p>
          </footer>
          {/* </div>
      </div>
      </div> */}
        </div>
      </div>
    </div>
  )
}

export default Landingpage