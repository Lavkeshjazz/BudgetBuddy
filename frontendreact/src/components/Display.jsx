import React from 'react';
import Graph from './Graph';
import { useLocation, Link } from 'react-router-dom';

const Display = () => {
  const location = useLocation();
  const productdata = location.state;
  const { img, title, expectedPrice, newPrice, productURL } = productdata;
  return (
    <div className='display'>
      <div className='itemsearch'>
        <div className='cardbox'>
          <img src={img} alt='Wristwatch by Ted Baker London' className='productimg' />
        </div>
        <h2 className='ptitle'>{title}</h2>
        <div className='pricesection'>
          <h3 className='pprice'> CURRENT PRICE IS ₹ {newPrice}</h3>
          <h3 className='exprice'>EXPECTED PRICE IS ₹ {expectedPrice}</h3>
        </div>
        <div className='graphcontainer'>
          <p className='graphtitle'>Price History</p>
          <Graph productURL={productURL} />
        </div>
        <p className='linkguide'>You can visit product in its official website at</p>
        <Link to={productURL} target='_blank'><h4 className='producturl'>{productURL}</h4></Link>
      </div>
      <Link to='/collections'><button className='gobackbtn'>Back to Collections</button></Link>
    </div>
  )
}

export default Display