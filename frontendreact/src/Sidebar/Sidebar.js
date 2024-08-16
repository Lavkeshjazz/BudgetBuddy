import Price from "./Price/Price";
import "./Sidebar.css";
import Sites from "./Sites/Sites";
import Demand from "./Demand/Demand";
import { useUserContext } from "../components/userContex";
import { useEffect } from "react";


const Sidebar = ({ handleChange }) => {
  const userContext = useUserContext();
  useEffect(() => {
    fetch('https://budgetbuddy-1-s4a6.onrender.com/user/authorized', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        userContext.login(userInfo.user_exist);
      })
    })
    // eslint-disable-next-line
  }, []);

  const username = userContext.user;
  // console.log("USER TYPE");
  // console.log(username?.userType); // Optional chaining to avoid errors if username is null or undefined
  return (
    <>
      <section className="sidebar">
        <div className="logo-container">
         <h1>Filters</h1>
        </div>
        <div className="solid-line"></div>
        <Sites handleChange={handleChange} />
        <div className="solid-line2"></div>
        <Price handleChange={handleChange} />
        {username?.userType === 'trader' && ( // Optional chaining to ensure username is not null or undefined
           <>
        <div className="solid-line2"></div>
        <Demand handleChange={handleChange} />
        <div className="solid-line2"></div>
        </>
        )}
      </section>
    </>
  );
};

export default Sidebar;
