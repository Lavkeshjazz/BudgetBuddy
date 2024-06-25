import React from 'react';
import ReactImageMagnify from 'react-image-magnify';
import Graph from './Graph';
import { useLocation, Link } from 'react-router-dom';

const Display = () => {
  const location = useLocation();
  const productdata = location.state;
  const { img, title, newPrice, expectedPrice, productURL } = productdata;
  return (
    <div className='display'>
      <div className='itemsearch'>
        <h2>{title}</h2>
        <h3>₹{newPrice}</h3>
        <h4>₹{expectedPrice}</h4>
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
  )
}

export default Display