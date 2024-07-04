import React from 'react';
import ReactImageMagnify from 'react-image-magnify';
import Graph from './Graph';
import { useLocation, Link } from 'react-router-dom';
import Navbar from './Navbar';

const Display = () => {
  const location = useLocation();
  const productdata = location.state;
  const { img, title, newPrice, expectedPrice, productURL,lowestprice,averageprice,highestprice } = productdata;
  return (
    <div>
      <Navbar name="collection" id="loginbtn"/>
    <div className='display'>
      <div className='itemsearch'>
        <div className='searchdetails1'>
        <h2 className='searchtitle1'>{title}</h2>
        <h3 className='currentpricetag1'>Current Price : ₹ {newPrice}</h3>
        {lowestprice && <h3 className='currentpricetag1'>Lowest Price : ₹ {lowestprice}</h3> }
        {averageprice && <h3 className='currentpricetag1'>Average Price : ₹ {averageprice}</h3> }
        {highestprice && <h3 className='currentpricetag1'>Highest Price : ₹ {highestprice}</h3> }
        </div>
        <div className='cardbox'>
          <div className='magnifier'>
            <ReactImageMagnify {...{
              smallImage: {
                alt: 'Wristwatch by Ted Baker London',
                isFluidWidth: true,
                src: `${img}`,
              },
              largeImage: {
                src: `${img}`,
                width: 1100,
                height: 750
              },
              shouldUsePositiveSpaceLens: true,
              isHintEnabled: true,
            }} />
          </div>
          <div className='graphcontainer'>
            <Graph productURL={productURL} />
          </div>
        </div>
      </div>
      <Link to='/collections'><button className='gobackbtn'>Go Back</button></Link>
    </div>
    </div>
  )
}

export default Display