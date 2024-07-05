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
        <div style={{ display: 'flex', alignItems: 'center' , marginTop : '20%', marginBottom : '5%'}}>
          {lowestprice && (
            <>
              <img src="/low price.png" alt="Lowest Price" style={{ height: '50px', width: '50px', marginRight: '10px' }} />
              <h3 className='currentpricetag2' style={{ margin: 0 }}>Lowest : ₹ {lowestprice}</h3>
            </>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center',marginBottom : '5%' }}>
          {averageprice && (
            <>
              <img src="/average price.png" alt="Average Price" style={{ height: '50px', width: '50px', marginRight: '10px' }} />
              <h3 className='currentpricetag3' style={{ margin: 0 }}>Average : ₹ {averageprice}</h3>
            </>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {highestprice && (
            <>
              <img src="/high price.png" alt="Highest Price" style={{ height: '50px', width: '45px', marginRight: '10px' }} />
              <h3 className='currentpricetag4' style={{ margin: 0 }}>Highest : ₹ {highestprice}</h3>
            </>
          )}
        </div>
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
          <div className="graph1" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/statistics.png" alt="Highest Price" style={{ height: '75px', width: '80px', marginRight: '10px' }} />
            <h1  className="searchtitle2" style={{ margin:0 }}>Price History Graph</h1>
          </div>
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