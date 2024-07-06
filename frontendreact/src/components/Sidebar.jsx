import React from 'react'
import Category from './Category';
import Price from './Price';
import Demand from './Demand';

const Sidebar = (handleChange,userType) => {
  console.log("USER TYPE");
  console.log(userType);
  return (
    <section className='Sidebar'>
      <div className='logo_container'>
        <h1>🛒</h1>
      </div>
      <Category handleChange={handleChange}/>
      <Price handleChange={handleChange}/>
      <Demand handleChange={handleChange}/>
    </section>
  )
}

export default Sidebar;